require("dotenv").config();

const {
  EXPRESS_SERVER_PORT,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} = process.env;

const serverConfig = {
  EXPRESS_SERVER_PORT: parseInt(EXPRESS_SERVER_PORT),
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
};

module.exports = serverConfig;
