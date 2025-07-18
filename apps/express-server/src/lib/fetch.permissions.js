const {
  postgresInstance,
} = require("../../../../packages/db-component/db.definitions");

const queries = require("../../../../sql/querys.json");

const loadPermissions = async () => {
  const response = await postgresInstance.query(
    queries.permissions.loadObjectAndMethods,
    []
  );

  return response;
};

const loadRoleMethodPermissions = async () => {
  const response = await postgresInstance.query(
    queries.permissions.loadRoleMethodPermissions,
    []
  );

  return response;
};

module.exports = {
  loadPermissions,
  loadRoleMethodPermissions,
};
