const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const apiRouter = require("./api");
const serverConfig = require("./config/server");
const {
  BoomErrorHandler,
  TypeErrorHandler,
  ServerErrorHandler,
} = require("./middlewares/errors.handler");
const router = require("./api");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.use(router, "/");

app.use(TypeErrorHandler);
app.use(BoomErrorHandler);
app.use(ServerErrorHandler);

server.listen(serverConfig.EXPRESS_SERVER_PORT, () => {
  console.log(`App running at port ${serverConfig.EXPRESS_SERVER_PORT}`);
});
