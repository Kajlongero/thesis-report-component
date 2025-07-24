const {
  postgresInstance,
} = require("../../../../packages/db-component/db.definitions");

const queries = require("../../../../sql/querys.json");
const CACHE_KEYS = require("../constants/cache");

const CacheService = require("./cache");

const cache = new CacheService();

const loadPermissions = async () => {
  const response = await postgresInstance.query(
    queries.permissions.loadObjectAndMethods,
    []
  );

  const map = new Map();

  const parsed = response.map(({ objectName, methodName }, index) => {
    map.set(index, `${index}_${objectName}_${methodName}`);
  });

  cache.addToCache(CACHE_KEYS.TRANSACTIONS, map);
  cache.findInCache(CACHE_KEYS.TRANSACTIONS);

  return response;
};

const loadRoleMethodPermissions = async () => {
  const response = await postgresInstance.query(
    queries.permissions.loadRoleMethodPermissions,
    []
  );

  const map = new Map();

  response.map(({ roleName, methodName }) => {
    if (!map.has(roleName)) {
      map.set(roleName, new Set());

      map.get(roleName).add(methodName);
    } else {
      map.get(roleName).add(methodName);
    }
  });

  cache.addToCache(CACHE_KEYS.ROLE_METHOD_PERMISSIONS, map);

  cache.findInCache(CACHE_KEYS.ROLE_METHOD_PERMISSIONS);

  return response;
};

module.exports = {
  loadPermissions,
  loadRoleMethodPermissions,
};
