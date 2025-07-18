const jwt = require("jsonwebtoken");
const { unauthorized } = require("@hapi/boom");

const serverConfig = require("../config/server");
const transactionIdMapper = require("../../../../packages/constants/transaction.mapper");

const { transactionsWithAuthRequired } = require("../utils/transaction.auths");
const ObjectMapperComponent = require("../components/object.mapper");

const dynamicExecuteMethod = require("../lib/dynamic.execution");

const mapper = new ObjectMapperComponent();

/**
 * Validates if a given role has permission to execute a specific method.
 * This check is performed by delegating to a permission-checking service via dynamicExecuteMethod.
 *
 * @param {string} role - The role ID of the user.
 * @param {string} method - The name of the method to check permission for.
 * @returns {Promise<boolean>} True if the role has permission, false otherwise.
 */
async function validatePermission(role, method) {
  const tx = transactionIdMapper.UserHasPermission;
  const { methodName, objectName } = mapper.findNames(tx);

  const executeMethod = await dynamicExecuteMethod(null, null, {
    methodName,
    objectName,
    params: {
      role,
      method,
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
  const txRequest = req.body.tx;
  if (!transactionsWithAuthRequired.has(txRequest)) return next();

  const at = req.cookies.accessToken;

  if (!at) return next(unauthorized("Invalid token"));

  try {
    const decodedToken = jwt.verify(at, serverConfig.JWT_ACCESS_TOKEN_SECRET);
    req.user = decodedToken;

    const { methodName } = mapper.findNames(txRequest);

    const valid = await validatePermission(decodedToken.role, methodName);
    if (!valid)
      return next(
        unauthorized("You do not have permissions to perform this action")
      );

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return next(unauthorized("Invalid Token."));

    if (error instanceof jwt.TokenExpiredError)
      return next(unauthorized("Token expired."));

    if (error.isBoom) return next(error);

    return next(unauthorized("An unexpected error occurred."));
  }
};

module.exports = validateTransactionPermission;
