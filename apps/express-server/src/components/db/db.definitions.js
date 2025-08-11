const dbConfig = require("../../config/db");

const DBComponent = require("./db");

const cnnStr = dbConfig.DB_CONNECTION_STRING;

const postgresInstance = new DBComponent("postgres", cnnStr);

module.exports = {
  postgresInstance,
};
