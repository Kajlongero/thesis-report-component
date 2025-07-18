const dynamicExecuteMethod = require("../../lib/dynamic.execution");

const transactionIdMapper = require("../../../../../packages/constants/transaction.mapper");

const ObjectMapperComponent = require("../../components/object.mapper");
const mapper = new ObjectMapperComponent();

const onDisconnect = async (socket) => {
  const sessionJti = socket.user.jti;
  const userId = socket.user.sub || socket.user.id;

  if (sessionJti && userId) {
    try {
      const data = mapper.findNames(transactionIdMapper.InactivateSession);
      const obj = {
        ...data,
        params: {
          jti: sessionJti,
          uid: userId,
        },
      };

      await dynamicExecuteMethod(null, null, obj);
    } catch (error) {
      console.error(
        `[WebSocket] Error al marcar la sesión ${sessionJti} como inactiva para user ID ${userId}:`,
        error
      );
    }
  } else {
    console.warn(
      `[WebSocket] No se pudo encontrar JTI o User ID en socket.user para marcar sesión inactiva al desconectar para socket ${socket.id}.`
    );
  }
};

module.exports = onDisconnect;
