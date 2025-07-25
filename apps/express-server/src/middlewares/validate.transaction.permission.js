const jwt = require("jsonwebtoken");
const { unauthorized } = require("@hapi/boom");

const serverConfig = require("../config/server");
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

  if (!at) return next(unauthorized("Invalid token"));

  try {
    const decodedToken = jwt.verify(at, serverConfig.JWT_ACCESS_TOKEN_SECRET);
    req.user = decodedToken;

    const valid = await validatePermission(req.user.role[0], body);
    if (!valid)
      return next(
        unauthorized("You do not have permissions to perform this action")
      );

    return next();
  } catch (error) {
    console.log(error);

    if (error instanceof jwt.JsonWebTokenError)
      return next(unauthorized("Invalid Token."));

    if (error instanceof jwt.TokenExpiredError)
      return next(unauthorized("Token expired."));

    if (error.isBoom) return next(error);

    return next(unauthorized("An unexpected error occurred."));
  }
};

module.exports = validateTransactionPermission;
