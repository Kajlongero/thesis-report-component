const transactionIdMapper = require("../../../../packages/constants/transaction.mapper");
const {
  getObjectAndMethod,
  dynamicExecuteMethod,
} = require("./dynamic.execution");

async function validatePermissions(role, body) {
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

module.exports = validatePermissions;
