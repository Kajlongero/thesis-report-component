const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const CacheLoader = require("./cache.loader");

const { PROTO_PATH_DEFINITIONS } = require("../../../../config/proto.paths");
const { internal } = require("@hapi/boom");

const cache = new CacheLoader();

const getProtoClient = (proto) => {
  if (!PROTO_PATH_DEFINITIONS[proto] || !PROTO_PATH_DEFINITIONS[proto].path)
    throw internal("No proto definition found for: " + proto);

  if (cache.findInstance(`grpc_proto_client_${proto}`))
    return cache.findInstance(`grpc_proto_client_${proto}`);

  const packageDefinition = protoLoader.loadSync(
    PROTO_PATH_DEFINITIONS[proto].path,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }
  );

  const grpcObject = grpc.loadPackageDefinition(packageDefinition);
  const protoClient = grpcObject[proto];

  cache.saveInstance(`grpc_proto_client_${proto}`, protoClient);

  return protoClient;
};

const getClient = (proto, obj) => {
  if (cache.findInstance(`grpc_client_${proto}_${obj}`))
    return cache.findInstance(`grpc_client_${proto}_${obj}`);

  const Proto = getProtoClient(proto);

  const client = new Proto[obj](
    PROTO_PATH_DEFINITIONS[proto].port,
    grpc.credentials.createInsecure()
  );

  cache.saveInstance(`grpc_client_${proto}_${obj}`, client);

  return client;
};

module.exports = {
  grpc,
  getClient,
  getProtoClient,
};
