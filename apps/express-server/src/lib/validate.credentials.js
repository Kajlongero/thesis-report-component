const jwt = require("jsonwebtoken");

const { unauthorized } = require("@hapi/boom");

const serverConfig = require("../config/server");
const errorResponses = require("../../../../packages/utils/error.responses");

/**
 * Valida un token de acceso JWT. Lanza un error si la validación falla.
 * @param {string} authorizationHeader - El valor completo del encabezado Authorization (ej. "Bearer <token>").
 * @returns {object} El payload decodificado del JWT si es válido.
 * @throws {Boom.unauthorized} Si el token no es válido, no se encuentra, o está expirado.
 */
const validateAccessJwt = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw unauthorized(errorResponses[401].TOKEN_NOT_FOUND);
  }

  const rawToken = authorizationHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(rawToken, serverConfig.JWT_ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw unauthorized(errorResponses[401].TOKEN_EXPIRED);
    }
    throw unauthorized(errorResponses[401].NOT_VALID_ACCESS_JWT);
  }
};

/**
 * Valida un token de refresco JWT. Lanza un error si la validación falla.
 * @param {string} refreshToken - El token de refresco puro.
 * @returns {object} El payload decodificado del JWT si es válido.
 * @throws {unauthorized} Si el token no es válido, no se encuentra, o está expirado.
 */
const validateRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    throw unauthorized(errorResponses[401].TOKEN_NOT_FOUND);
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      serverConfig.JWT_REFRESH_TOKEN_SECRET
    );
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw unauthorized(errorResponses[401].TOKEN_EXPIRED);
    }
    throw unauthorized(errorResponses[401].NOT_VALID_REFRESH_JWT);
  }
};

module.exports = { validateAccessJwt, validateRefreshToken };
