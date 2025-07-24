const { getClient } = require("../lib/grpc.client");

const { PROTO_PATH_DEFINITIONS } = require("../../../../config/proto.paths");
const CacheService = require("./cache");

const loadGrpcClientsCache = () => {
  const entries = Object.entries(PROTO_PATH_DEFINITIONS);

  if (!entries || entries.length === 0) return;

  entries.forEach((vals) => {
    const [key, val] = vals;

    Object.entries(val.services || {}).forEach((elem) => {
      const [serviceName, serviceConfig] = elem;
      const methods = serviceConfig.methods || [];

      if (methods && Array.isArray(methods)) {
        serviceConfig.methods.forEach((methodName) => {
          try {
            getClient(key, serviceName, methodName);

            console.log(
              `[loadGrpcClientsCache] Loaded gRPC client for ${key}.${serviceName}.${methodName}`
            );
          } catch (error) {
            console.error(
              `[loadGrpcClientsCache] Error loading gRPC client for ${key}.${serviceName}.${methodName}:`
            );
          }
        });
      }
    });
  });
};

module.exports = loadGrpcClientsCache;
