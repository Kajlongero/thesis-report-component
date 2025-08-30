const path = require("path");

const rootPath = process.cwd();

const PROTOS_DEFINITIONS = path.join(rootPath, "packages", "proto-definitions");

const PROTOS_BASE = path.join(PROTOS_DEFINITIONS, "base");

console.log(PROTOS_DEFINITIONS);

const PROTO_PATH_DEFINITIONS = {
  greeter: {
    path: path.join(PROTOS_DEFINITIONS, "greeter.proto"),
    package: "greeter",
    port: "0.0.0.0:50000",
    services: {
      Greeter: {
        methods: ["SayHello"],
      },
    },
  },
  db: {
    path: path.join(PROTOS_DEFINITIONS, "db.proto"),
    service: "db",
    port: "0.0.0.0:50051",
    services: {},
  },
  csv: {
    path: path.join(PROTOS_DEFINITIONS, "csv.proto"),
    package: "csv",
    port: "0.0.0.0:50061",
    services: {
      Greeter: {
        methods: ["GenerateReport"],
      },
    },
  },
  pdf: {
    path: path.join(PROTOS_DEFINITIONS, "pdf.proto"),
    package: "pdf",
    port: "0.0.0.0:50071",
    services: {
      ReportService: {
        methods: ["GenerateReport"],
      },
    },
  },
  html: {
    path: path.join(PROTOS_DEFINITIONS, "html.proto"),
    package: "html",
    port: "0.0.0.0:50081",
    services: {
      ReportService: {
        methods: ["GenerateReport"],
      },
    },
  },
  docx: {
    path: path.join(PROTOS_DEFINITIONS, "docx.proto"),
    package: "docx",
    port: "0.0.0.0:50091",
    services: {
      ReportService: {
        methods: ["GenerateReport"],
      },
    },
  },
  xlsx: {
    path: path.join(PROTOS_DEFINITIONS, "xlsx.proto"),
    package: "xlsx",
    port: "0.0.0.0:50101",
    services: {
      ReportService: {
        methods: ["GenerateReport"],
      },
    },
  },
};

module.exports = { PROTOS_BASE, PROTO_PATH_DEFINITIONS };
