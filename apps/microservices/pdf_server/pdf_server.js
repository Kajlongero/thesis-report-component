const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { PROTO_PATH_DEFINITIONS } = require("../../../config/proto.paths");

const GenerateReports = require("./functions/GenerateReports");

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH_DEFINITIONS.pdf.path,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const pdfProto = grpc.loadPackageDefinition(packageDefinition).pdf;

function main() {
  const server = new grpc.Server();

  server.addService(pdfProto.ReportService.service, {
    GenerateReport: GenerateReports,
  });

  const port = PROTO_PATH_DEFINITIONS.pdf.port;
  const creds = grpc.ServerCredentials.createInsecure();

  server.bindAsync(port, creds, (error, boundPort) => {
    if (error) {
      console.error("Failed to bind HTML gRPC server:", error);
      return;
    }

    process.on("SIGINT", () => {
      console.log("Shutting down HTML gRPC server...");
      server.tryShutdown((error) => {
        if (error) {
          console.error("Error shutting down server:", error);
          process.exit(1);
        } else {
          console.log("HTML gRPC server shut down successfully");
          process.exit(0);
        }
      });
    });
  });
}

main();
