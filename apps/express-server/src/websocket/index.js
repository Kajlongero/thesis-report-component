const { forbidden } = require("@hapi/boom");

const ObjectMapperComponent = require("../components/object.mapper");

const AuthorizationService = require("../services/AuthorizationService");
const dynamicExecuteOnSocketMethod = require("../lib/dynamic.websocket.execution");

const SOCKET_EVENT_MESSAGES = require("../../../../packages/constants/socket.event.messages");

const objectMapper = new ObjectMapperComponent();
const authorizationService = new AuthorizationService();

const onDisconnect = require("./lib/disconnect");

/**
 * Registra todos los oyentes de eventos de Socket.IO para una conexión de cliente individual.
 * Aquí es donde se define cómo el servidor responde a los mensajes enviados por el cliente WebSocket.
 *
 * @param {import('socket.io').Server} io - La instancia global del servidor Socket.IO.
 * @param {import('socket.io').Socket} socket - El objeto socket para la conexión cliente actual.
 */
const registerSocketEvents = (io, socket) => {
  if (socket.shouldNotifyRefresh)
    socket.emit(SOCKET_EVENT_MESSAGES.server.CLIENT_SHOULD_REFRESH_SESSION);

  socket.on("disconnect", () => onDisconnect(socket));
};

module.exports = { registerSocketEvents };
