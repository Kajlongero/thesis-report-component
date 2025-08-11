require("dotenv").config();

const { DB_CONNECTION_STRING } = process.env;

const dbConfig = {
  DB_CONNECTION_STRING,
};

module.exports = dbConfig;
