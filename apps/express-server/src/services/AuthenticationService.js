const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  postgresInstance,
} = require("../../../../packages/db-component/db.definitions");
const dbQueries = require("../../../../sql/querys.json");
const { unauthorized, internal, conflict, notFound } = require("@hapi/boom");
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

  async GetUserData(req, res, data) {
    const payload = req.user;

    const roleId = ROLES_IDS[payload.role[0]];

    const transaction = await postgresInstance.queryTransactions([
      {
        sql: dbQueries.user.getById,
        params: [payload.sub],
        returnedElements: true,
      },
      {
        sql: dbQueries.permissions.getRolePermissions,
        params: [roleId],
        returnedElements: true,
      },
    ]);
    if (!transaction) throw internal("Failed to load user data");

    const user = transaction[0][0];
    if (!user) throw notFound("User not found");

    const permissions = transaction[1];
    if (!permissions) throw internal("Failed to load permissions");

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    return {
      error: "",
      message: "Success",
      statusCode: 200,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
        permissions: permissions.map((perm) => ({
          id: perm.permission_id,
          name: perm.permission_name,
        })),
      },
    };
  }

  async Login(req, res, data) {
    const user = await postgresInstance.queryOne(dbQueries.user.getByEmail, [
      data.email,
    ]);
    if (!user) throw unauthorized("Invalid credentials");

    if (user.isLocked)
      throw unauthorized("Account locked due to too many login attempts");

    const attempts = user.loginAttempts;

    const timeToLoginAgain = user.timeToLoginAgain;
    const hasTimeToLoginAgain = timeToLoginAgain
      ? new Date(timeToLoginAgain).toISOString() > new Date().toISOString()
      : false;

    if (attempts >= 5 && hasTimeToLoginAgain)
      throw unauthorized("Account locked due to too many login attempts");

    const password = user.password;

    const compare = await bcrypt.compare(data.password, password);
    if (!compare) {
      await postgresInstance.query(dbQueries.user.updateAttempts, [
        user.id,
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
        params: [user.id, atJti, rtJti, expires],
        returnedElements: true,
      },
      {
        sql: dbQueries.user.updateAttempts,
        params: [user.id, 0, null],
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
      sub: user.id,
      jti: atJti,
      role: [user.role],
      expires: expires,
    };
    const refreshTokenPayload = {
      sub: user.id,
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

    res.cookie("userId", user.id, {
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
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
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
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
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
