const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  postgresInstance,
} = require("../../../../packages/db-component/db.definitions");
const dbQueries = require("../../../../sql/querys.json");
const { unauthorized, internal, conflict } = require("@hapi/boom");
const serverConfig = require("../config/server");
const { ROLES_IDS, ROLES } = require("../../../../packages/constants/roles");

class AuthenticationService {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {{
   *   email: string;
   *   password: string;
   * }} data
   */
  async Login(req, res, data) {
    const email = await postgresInstance.queryOne(dbQueries.user.getByEmail, [
      data.email,
    ]);
    if (!email) throw unauthorized("Invalid credentials");

    if (email.isLocked)
      throw unauthorized("Account locked due to too many login attempts");

    const attempts = email.loginAttempts;

    const timeToLoginAgain = email.timeToLoginAgain;
    const hasTimeToLoginAgain = timeToLoginAgain
      ? new Date(timeToLoginAgain).toISOString() > new Date().toISOString()
      : false;

    if (attempts >= 5 && hasTimeToLoginAgain)
      throw unauthorized("Account locked due to too many login attempts");

    const password = email.password;

    const compare = await bcrypt.compare(data.password, password);
    if (!compare) {
      await postgresInstance.query(dbQueries.user.updateAttempts, [
        email.id,
        attempts + 1,
        attempts + 1 >= 5
          ? new Date(Date.now() + 60 * 60 * 1000).toISOString()
          : null,
      ]);

      throw unauthorized("Invalid credentials");
    }

    const atJti = crypto.randomBytes(16).toString("hex");
    const rtJti = crypto.randomBytes(16).toString("hex");

    const expires = new Date(1000 * 60 * 60 * 6).toISOString();

    const transaction = await postgresInstance.queryTransactions([
      {
        sql: dbQueries.sessions.createSession,
        params: [email.id, atJti, rtJti, expires],
        returnedElements: true,
      },
      {
        sql: dbQueries.user.updateAttempts,
        params: [email.id, 0, null],
        returnedElements: true,
      },
      {
        sql: dbQueries.permissions.getRolePermissions,
        params: [data.roleId],
        returnedElements: true,
      },
    ]);

    const session = transaction[0][0];
    if (!session) throw internal("Failed to create session");

    const permissions = transaction[2];
    if (!permissions) throw internal("Failed to load permissions");

    const accessTokenPayload = {
      sub: email.id,
      jti: atJti,
      role: [email.role],
      expires: expires,
    };
    const refreshTokenPayload = {
      sub: email.id,
      jti: rtJti,
      expires: expires,
    };

    const accessTokenJwt = jwt.sign(
      accessTokenPayload,
      serverConfig.JWT_ACCESS_TOKEN_SECRET
    );
    const refreshTokenJwt = jwt.sign(
      refreshTokenPayload,
      serverConfig.JWT_REFRESH_TOKEN_SECRET
    );

    res.cookie("sessionId", session.id, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });

    res.cookie("userId", email.id, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });

    res.cookie("accessToken", accessTokenJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.cookie("refreshToken", refreshTokenJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
    });

    res.setHeader("Content-Type", "application/json");

    res.statusCode = 200;

    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        user: {
          id: email.id,
          email: email.email,
          role: email.role,
          isActive: email.isActive,
          firstName: email.firstName,
          lastName: email.lastName,
        },
        permissions: permissions.map((perm) => ({
          id: perm.permission_id,
          name: perm.permission_name,
        })),
      },
    };
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {{
   *   email: string;
   *   password: string;
   *   lastName: string;
   *   firstName: string;
   * }} params
   */
  async Signup(req, res, data) {
    const query = dbQueries.user.getByEmail;

    const email = await postgresInstance.queryOne(dbQueries.user.getByEmail, [
      data.email,
    ]);
    if (email) throw conflict("Email already exists");

    const hash = await bcrypt.hash(data.password, 10);

    const newUser = await postgresInstance.queryOne(dbQueries.user.createUser, [
      data.email,
      hash,
      ROLES_IDS[ROLES.USER],
      data.lastName,
      data.firstName,
    ]);
    if (!newUser) throw internal("Failed to create user");

    const atJti = crypto.randomBytes(16).toString("hex");
    const rtJti = crypto.randomBytes(16).toString("hex");

    const expires = new Date(1000 * 60 * 60 * 6).toISOString();

    const transaction = await postgresInstance.queryTransactions([
      {
        sql: dbQueries.sessions.createSession,
        params: [newUser.id, atJti, rtJti, expires],
        returnedElements: true,
      },
      {
        sql: dbQueries.permissions.getRolePermissions,
        params: [ROLES_IDS[ROLES.USER]],
        returnedElements: true,
      },
    ]);
    const session = transaction[0][0];
    if (!session) throw internal("Failed to create session");

    const permissions = transaction[1];
    if (!permissions) throw internal("Failed to load permissions");

    const accessTokenPayload = {
      sub: newUser.id,
      jti: atJti,
      role: [newUser.role],
      expires: expires,
    };
    const refreshTokenPayload = {
      sub: newUser.id,
      jti: rtJti,
      expires: expires,
    };

    const accessTokenJwt = jwt.sign(
      accessTokenPayload,
      serverConfig.JWT_ACCESS_TOKEN_SECRET
    );
    const refreshTokenJwt = jwt.sign(
      refreshTokenPayload,
      serverConfig.JWT_REFRESH_TOKEN_SECRET
    );
    res.cookie("sessionId", session.id, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });
    res.cookie("userId", newUser.id, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });
    res.cookie("accessToken", accessTokenJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60,
    });
    res.cookie("refreshToken", refreshTokenJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 6,
    });

    res.setHeader("Content-Type", "application/json");

    res.statusCode = 201;

    return {
      statusCode: 201,
      message: "Signup successful",
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.isActive,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        permissions: permissions.map((perm) => ({
          id: perm.permission_id,
          name: perm.permission_name,
        })),
      },
    };
  }

  async ResetPassword(req, res, data) {}
  async ConfirmAccount(req, res, data) {}
  async RecoverPassword(req, res, data) {}
}

module.exports = AuthenticationService;
