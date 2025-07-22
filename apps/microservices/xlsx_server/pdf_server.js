const crypto = require("crypto");

const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const {
  PROTOS_BASE,
  PROTO_PATH_DEFINITIONS,
} = require("../../../config/proto.paths");

const packageBaseProtoDefinition = protoLoader.loadSync(PROTOS_BASE, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH_DEFINITIONS.xlsx.path,
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

  const port = PROTO_PATH_DEFINITIONS.xlsx.port;
  const creds = grpc.ServerCredentials.createInsecure();
  const cb = () => server.start();

  server.bindAsync(port, creds, cb);
}

main();
