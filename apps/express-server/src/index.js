const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");

const router = require("./api");
const serverConfig = require("./config/server");
const {
  loadPermissions,
  loadRoleMethodPermissions,
} = require("./lib/fetch.permissions");
const {
  BoomErrorHandler,
  TypeErrorHandler,
  ServerErrorHandler,
} = require("./middlewares/errors.handler");
const socketAuthMiddleware = require("./websocket/middlewares/auth");

const ObjectMapperComponent = require("./components/object.mapper");
const AuthorizationService = require("./services/AuthorizationService");

const mapper = new ObjectMapperComponent();
const auth = new AuthorizationService();

const app = express();

(async () => {
  const permissions = await loadPermissions();
  const roleMethodPermissions = await loadRoleMethodPermissions();

  auth.initialize(roleMethodPermissions);
  mapper.generate(permissions);

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.use(socketAuthMiddleware);

  app.use("/", router);

  app.use(TypeErrorHandler);
  app.use(BoomErrorHandler);
  app.use(ServerErrorHandler);

  module.exports = { io };

  server.listen(serverConfig.EXPRESS_SERVER_PORT, () => {
    console.log(`App running at port ${serverConfig.EXPRESS_SERVER_PORT}`);
  });
})();
