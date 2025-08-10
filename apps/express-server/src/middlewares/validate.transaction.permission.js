const jwt = require("jsonwebtoken");
const { unauthorized } = require("@hapi/boom");

const serverConfig = require("../config/server");
const COMMON_RESPONSES = require("../constants/responses");
const transactionIdMapper = require("../../../../packages/constants/transaction.mapper");

const { transactionsWithAuthRequired } = require("../utils/transaction.auths");

const {
  getObjectAndMethod,
  dynamicExecuteMethod,
} = require("../lib/dynamic.execution");

/**
 * Validates if a given role has permission to execute a specific method.
 * This check is performed by delegating to a permission-checking service via dynamicExecuteMethod.
 *
 * @param {string} role - The role ID of the user.
 * @param {object} body - The body of the request containing the transaction ID and parameters.
 * @returns {Promise<boolean>} True if the role has permission, false otherwise.
 */
async function validatePermission(role, body) {
  const tx = transactionIdMapper.UserHasPermission;

  const result = getObjectAndMethod(body);

  const executeMethod = await dynamicExecuteMethod(null, null, {
    tx,
    params: {
      role,
      method: result.methodName,
    },
  });

  return executeMethod;
}

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
  if (!transactionsWithAuthRequired.has(body.tx)) return next();

  const at = req.cookies.accessToken;
  const rt = req.cookies.refreshToken;

  if (!at && !rt)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_INVALID));

  const validAccessToken = validateAccessToken(req, at);

  if (validAccessToken.data) return next();

  if (validAccessToken.message === COMMON_RESPONSES[401].TOKEN_EXPIRED)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));

  const validRefreshToken = validateRefreshToken(res, rt);

  if (validRefreshToken.message === COMMON_RESPONSES[401].TOKEN_EXPIRED)
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));

  return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));
};

module.exports = validateTransactionPermission;
