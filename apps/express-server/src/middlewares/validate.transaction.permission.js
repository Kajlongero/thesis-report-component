const jwt = require("jsonwebtoken");
const { unauthorized } = require("@hapi/boom");

const serverConfig = require("../config/server");
const COMMON_RESPONSES = require("../constants/responses");

const { txAuthRequired } = require("../utils/transaction.auths");

const validatePermissions = require("../lib/validate.permissions");

function validateAccessToken(req, token) {
  try {
    const decode = jwt.verify(token, serverConfig.JWT_ACCESS_TOKEN_SECRET);
    req.user = decode;

    return {
      message: "Success",
      data: decode,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return {
        message: COMMON_RESPONSES[401].TOKEN_INVALID,
        data: null,
      };

    if (error instanceof jwt.TokenExpiredError)
      return {
        message: COMMON_RESPONSES[401].TOKEN_EXPIRED,
        data: null,
      };

    if (error.isBoom) throw error;
  }
}

function validateRefreshToken(res, token) {
  try {
    const decode = jwt.verify(token, serverConfig.JWT_REFRESH_TOKEN_SECRET);

    return {
      message: "Success",
      data: decode,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.clearCookie("userId");
      res.clearCookie("sessionId");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return {
        message: COMMON_RESPONSES[401].TOKEN_INVALID,
        data: null,
      };
    }

    if (error instanceof jwt.TokenExpiredError)
      return {
        message: COMMON_RESPONSES[401].TOKEN_EXPIRED,
        data: null,
      };

    if (error.isBoom) throw error;
  }
}

/**
 * Express middleware to validate JWT and transaction-level permissions.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
const validateTransactionPermission = async (req, res, next) => {
  const body = req.body;

  if (!txAuthRequired.has(body.tx)) return next();

  const at = req.cookies.accessToken;
  const rt = req.cookies.refreshToken;

  if (!at && !rt)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_INVALID));

  const validAccessToken = validateAccessToken(req, at);

  if (validAccessToken.data) {
    const role = validAccessToken.data.role[0];
    const allowed = await validatePermissions(role, body);

    if (!allowed) return next(unauthorized(COMMON_RESPONSES[401].UNAUTHORIZED));

    return next();
  }

  if (validAccessToken.message === COMMON_RESPONSES[401].TOKEN_EXPIRED)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));

  const validRefreshToken = validateRefreshToken(res, rt);

  if (validRefreshToken.message === COMMON_RESPONSES[401].TOKEN_EXPIRED)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));

  return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));
};

module.exports = validateTransactionPermission;
