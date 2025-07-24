const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { internal } = require("@hapi/boom");

const { PROTO_PATH_DEFINITIONS } = require("../../../../config/proto.paths");

const CACHE_KEYS = require("../constants/cache");
const CacheService = require("./cache");

const cacheService = new CacheService();

const getProtoPackage = (protoKey) => {
  if (!cacheService.findInCache(CACHE_KEYS.GRPC_RELATED)) {
    cacheService.addToCache(CACHE_KEYS.GRPC_RELATED, new Map());
  }

  const cache = cacheService.findInCache(CACHE_KEYS.GRPC_RELATED);

  const protoDef = PROTO_PATH_DEFINITIONS[protoKey];

  if (!protoDef || !protoDef.path)
    throw internal(`No proto definition path found for key: ${protoKey}`);

  const cacheKey = `grpc_proto_definition_${protoKey}`;

  const cachedProtoPackage = cache.get(cacheKey);
  if (cachedProtoPackage) return cachedProtoPackage;

  const packageDefinition = protoLoader.loadSync(protoDef.path, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const grpcObject = grpc.loadPackageDefinition(packageDefinition);
  const protoPackage = grpcObject[protoDef.package];

  if (!protoPackage)
    throw internal(
      `Proto package '${protoDef.package}' not found inside the loaded .proto file: ${protoDef.path}`
    );

  cache.set(cacheKey, protoPackage);

  return protoPackage;
};

/**
 * Obtiene o crea una instancia de un cliente gRPC para un servicio específico dentro de un proto.
 * @param {string} protoKey - La clave del proto en PROTO_PATH_DEFINITIONS (ej. 'csv', 'auth_and_user_proto').
 * @param {string} serviceName - El nombre del servicio gRPC dentro del paquete (ej. 'ReportService', 'AuthService').
 * @returns {Object} Una instancia del cliente gRPC para el servicio definido.
 * @throws {Boom.internal} Si no se encuentra la definición del proto, el servicio o la dirección del servidor.
 */
const getServiceClient = (protoKey, serviceName) => {
  if (!cacheService.findInCache(CACHE_KEYS.GRPC_RELATED)) {
    cacheService.addToCache(CACHE_KEYS.GRPC_RELATED, new Map());
  }

  const cache = cacheService.findInCache(CACHE_KEYS.GRPC_RELATED);

  const protoDef = PROTO_PATH_DEFINITIONS[protoKey];

  if (
    !protoDef ||
    !protoDef.port ||
    !protoDef.services ||
    !protoDef.services[serviceName]
  ) {
    throw internal(
      `Configuration for service '${serviceName}' or port not found for proto key '${protoKey}'.`
    );
  }

  const cacheKey = `grpc_service_client_instance_${protoKey}_${serviceName}`;

  const cachedClient = cache.get(cacheKey);
  if (cachedClient) return cachedClient;

  const ProtoPackage = getProtoPackage(protoKey);

  if (!ProtoPackage[serviceName])
    throw internal(
      `Service '${serviceName}' not found in proto package '${protoDef.package}' loaded from ${protoDef.path}.`
    );

  const serverAddress = protoDef.port;

  const client = new ProtoPackage[serviceName](
    serverAddress,
    grpc.credentials.createInsecure()
  );

  cache.set(cacheKey, client);

  return client;
};

/**
 * Obtiene o crea una referencia a un método RPC específico de un cliente gRPC.
 * Este es el getClient que tu index.js espera.
 * @param {string} protoKey - La clave del proto en PROTO_PATH_DEFINITIONS (ej. 'csv', 'auth_and_user_proto').
 * @param {string} serviceName - El nombre del servicio gRPC dentro del paquete (ej. 'ReportService', 'AuthService').
 * @param {string} methodName - El nombre del método RPC a obtener (ej. 'GenerateReport', 'Login').
 * @returns {Function} La función del método RPC específica (ej. client.GenerateReport).
 * @throws {Boom.internal} Si no se encuentra el servicio o el método.
 */
const getClient = (protoKey, serviceName, methodName) => {
  if (!cacheService.findInCache(CACHE_KEYS.GRPC_RELATED)) {
    cacheService.addToCache(CACHE_KEYS.GRPC_RELATED, new Map());
  }

  const cache = cacheService.findInCache(CACHE_KEYS.GRPC_RELATED);

  const cacheKey = `grpc_rpc_method_function_${protoKey}_${serviceName}_${methodName}`;

  const cachedMethod = cache.get(cacheKey);
  if (cachedMethod) return cachedMethod;

  const serviceClient = getServiceClient(protoKey, serviceName);

  if (typeof serviceClient[methodName] !== "function")
    throw internal(
      `RPC method '${methodName}' not found on service client '${serviceName}' for proto key '${protoKey}'.`
    );

  const rpcMethod = serviceClient[methodName].bind(serviceClient);

  cache.set(cacheKey, rpcMethod);

  return rpcMethod;
};

module.exports = {
  grpc,
  getClient,
  getProtoPackage,
  getServiceClient,
};
