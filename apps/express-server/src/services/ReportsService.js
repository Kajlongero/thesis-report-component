const CacheService = require("../lib/cache");
const cacheService = new CacheService();

const { getClient, getServiceClient } = require("../lib/grpc.client");

class ReportsService {
  async GeneratePDF(req, res, params) {}

  async GenerateCSV(req, res, params) {
    console.log(cacheService.findInCache("grpcRelated"));

    // Este método está siendo usado para probar el servicio Greeter.
    // En una implementación real, aquí iría la lógica para generar CSV.

    const protoKey = "greeter"; // La clave en PROTO_PATH_DEFINITIONS para el servicio Greeter
    const serviceName = "Greeter"; // El nombre del servicio gRPC (tal como está en greeter.proto)
    const methodName = "SayHello"; // El método RPC a llamar

    // Obtener la función del método RPC específica del caché.
    // getClient internamente obtiene el service client y el método, y los cachea.
    const sayHelloRpc = getClient(protoKey, serviceName, methodName);

    console.log(
      `[ReportsService - GenerateCSV] Calling ${protoKey}.${serviceName}.${methodName}`
    );

    try {
      // Envuelve la llamada gRPC basada en callback en una Promise para usar async/await
      const response = await new Promise((resolve, reject) => {
        // La función sayHelloRpc ya está bindeada a la instancia del cliente.
        sayHelloRpc({ name: params.name || "World" }, (error, response) => {
          if (error) {
            console.error(`[ReportsService - GenerateCSV] gRPC Error:`, error);
            return reject(error);
          }
          resolve(response);
        });
      });

      console.log(
        `[ReportsService - GenerateCSV] gRPC Response: ${JSON.stringify(
          response
        )}`
      );
      return response.message;
    } catch (error) {
      console.error(
        `[ReportsService - GenerateCSV] Failed to call Greeter service:`,
        error
      );
      throw error; // Propaga el error para que pueda ser manejado por el middleware de errores
    }
  }

  async GenerateHTML(req, res, params) {}
  async GenerateDOCX(req, res, params) {}
  async GeneratePDF(req, res, params) {}
}

module.exports = ReportsService;
