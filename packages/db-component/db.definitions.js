require("dotenv").config();

const DBComponent = require("./db");

const cnnStr = process.env.DB_CONNECTION_STRING;

const postgresInstance = new DBComponent("postgres", cnnStr);

module.exports = {
  postgresInstance,
};
