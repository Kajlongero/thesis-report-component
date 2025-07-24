const crypto = require("crypto");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { PROTO_PATH_DEFINITIONS } = require("../../../config/proto.paths");

const csvPackageDefinition = protoLoader.loadSync(
  PROTO_PATH_DEFINITIONS.csv.path,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

function main() {
  const server = new grpc.Server();

  const port = PROTO_PATH_DEFINITIONS.csv.port;
  const creds = grpc.ServerCredentials.createInsecure();

  server.bindAsync(port, creds, cb);
}

main();
