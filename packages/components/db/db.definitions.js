const path = require("path");
const dotenv = require("dotenv");

const rootPath = process.cwd();
dotenv.config({ path: path.join(rootPath, ".env") });

const DBComponent = require("./db");

const connection = process.env.DB_CONNECTION_STRING;

const postgresInstance = (name) => new DBComponent(name, connection);

module.exports = {
  postgresInstance,
};
