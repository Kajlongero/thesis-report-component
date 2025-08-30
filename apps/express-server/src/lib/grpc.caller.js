const { promisify } = require("util");
const { getClient } = require("./grpc.client");

/**
 * Wrapper para llamadas gRPC que retorna objeto con error o data
 * @param {string} protoKey - Clave del proto (pdf, html, csv, etc.)
 * @param {string} serviceName - Nombre del servicio
 * @param {string} methodName - Nombre del método
 * @param {Object} data - Datos para enviar
 * @returns {Promise<Object>} { error, message, statusCode, data }
 */
async function callGrpc(protoKey, serviceName, methodName, data) {
  try {
    const grpcMethod = getClient(protoKey, serviceName, methodName);
    const promisifiedMethod = promisify(grpcMethod);

    const response = await promisifiedMethod(data);

    return {
      error: null,
      message: "Success",
      statusCode: 200,
      data: response,
    };
  } catch (error) {
    console.error(`gRPC Error - ${protoKey}.${serviceName}.${methodName}:`, {
      code: error.code,
      message: error.message,
      details: error.details,
    });

    // Mapear códigos de error gRPC a respuestas apropiadas
    switch (error.code) {
      case 14: // UNAVAILABLE
        return {
          error: `${serviceName} service is temporarily unavailable`,
          message: `${serviceName} service is temporarily unavailable`,
          statusCode: 503,
          data: null,
        };

      case 3: // INVALID_ARGUMENT
        return {
          error: "Invalid request parameters sent to service",
          message: "Invalid request parameters sent to service",
          statusCode: 400,
          data: null,
        };

      case 4: // DEADLINE_EXCEEDED
        return {
          error: `${methodName} request timed out`,
          message: `${methodName} request timed out`,
          statusCode: 408,
          data: null,
        };

      case 16: // UNAUTHENTICATED
        return {
          error: "Service authentication required",
          message: "Service authentication required",
          statusCode: 401,
          data: null,
        };

      case 7: // PERMISSION_DENIED
        return {
          error: "Permission denied by service",
          message: "Permission denied by service",
          statusCode: 403,
          data: null,
        };

      case 5: // NOT_FOUND
        return {
          error: "Requested resource not found in service",
          message: "Requested resource not found in service",
          statusCode: 404,
          data: null,
        };

      case 6: // ALREADY_EXISTS
        return {
          error: "Resource already exists",
          message: "Resource already exists",
          statusCode: 409,
          data: null,
        };

      case 8: // RESOURCE_EXHAUSTED
        return {
          error: "Service resources exhausted, try again later",
          message: "Service resources exhausted, try again later",
          statusCode: 503,
          data: null,
        };

      case 9: // FAILED_PRECONDITION
        return {
          error: "Service preconditions not met",
          message: "Service preconditions not met",
          statusCode: 400,
          data: null,
        };

      case 13: // INTERNAL
        return {
          error: `Internal ${serviceName} service error`,
          message: `Internal ${serviceName} service error`,
          statusCode: 500,
          data: null,
        };

      default:
        return {
          error: `${methodName} operation failed`,
          message: `${methodName} operation failed`,
          statusCode: 500,
          data: null,
        };
    }
  }
}

module.exports = { callGrpc };
