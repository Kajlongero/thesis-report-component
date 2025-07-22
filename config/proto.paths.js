const path = require("path");

const rootPath = process.cwd();

const PROTOS_DEFINITIONS = path.join(rootPath, "package", "proto-definitons");

const PROTOS_BASE = path.join(PROTOS_DEFINITIONS, "base");

const PROTO_PATH_DEFINITIONS = {
  db: {
    path: path.join(PROTOS_DEFINITIONS, "db.proto"),
    service: "db",
    port: "0.0.0.0:50051",
    methods: [],
  },
  csv: {
    path: path.join(PROTOS_DEFINITIONS, "csv.proto"),
    service: "csv",
    port: "0.0.0.0:50061",
    methods: [],
  },
  pdf: {
    path: path.join(PROTOS_DEFINITIONS, "pdf.proto"),
    service: "pdf",
    port: "0.0.0:50071",
    methods: [],
  },
  html: {
    path: path.join(PROTOS_DEFINITIONS, "html.proto"),
    service: "html",
    port: "0.0.0:50081",
    methods: [],
  },
  docx: {
    path: path.join(PROTOS_DEFINITIONS, "docx.proto"),
    service: "docx",
    port: "0.0.0:50091",
    methods: [],
  },
  xlsx: {
    path: path.join(PROTOS_DEFINITIONS, "xlsx.proto"),
    service: "xlsx",
    port: "0.0.0:50101",
    methods: [],
  },
};

module.exports = { PROTOS_BASE, PROTO_PATH_DEFINITIONS };
