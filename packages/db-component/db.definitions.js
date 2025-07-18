require("dotenv").config();

const DBComponent = require("./db");

const cnnStr = process.env.DB_CONNECTION_STRING;

const postgresInstance = DBComponent.getInstance("postgres", cnnStr);

module.exports = {
  postgresInstance,
};
