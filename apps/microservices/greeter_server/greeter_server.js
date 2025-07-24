// servers/greeter_server.js

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Importa la configuración de los protos para obtener la ruta y el puerto
const { PROTO_PATH_DEFINITIONS } = require("../../../config/proto.paths"); // Ajusta la ruta si es necesario

// Obtén la configuración específica para el servicio greeter
const greeterConfig = PROTO_PATH_DEFINITIONS.greeter;

if (!greeterConfig) {
  console.error(
    "Greeter service configuration not found in proto.paths.js. Exiting."
  );
  process.exit(1);
}

// Carga la definición del paquete Protocol Buffer desde el archivo .proto
const packageDefinition = protoLoader.loadSync(
  greeterConfig.path, // Usa la ruta del greeter.proto
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

// Carga el paquete 'greeter' definido en el .proto
// 'greeter' (la variable) ahora contiene el objeto cargado del .proto,
// y para acceder al paquete 'greeter' dentro de él, se usa greeter.<package_name>
const greeterProto = grpc.loadPackageDefinition(packageDefinition); // <-- Renombrado a greeterProto para claridad

/**
 * Implementación del método SayHello.
 * @param {Object} call - Objeto de la llamada gRPC, contiene la solicitud (call.request).
 * @param {Function} callback - Función para enviar la respuesta de vuelta al cliente.
 */
function sayHello(call, callback) {
  const name = call.request.name || "World";
  console.log(`[Greeter Server] Received SayHello request for: ${name}`);
  callback(null, { message: `Hello, ${name}!` });
}

/**
 * Implementación del método SayHelloAgain.
 * @param {Object} call - Objeto de la llamada gRPC.
 * @param {Function} callback - Función para enviar la respuesta.
 */
function sayHelloAgain(call, callback) {
  const name = call.request.name || "Friend";
  console.log(`[Greeter Server] Received SayHelloAgain request for: ${name}`);
  callback(null, { message: `Hello again, ${name}!` });
}

/**
 * Función principal para iniciar el servidor gRPC.
 */
function main() {
  const server = new grpc.Server();

  // Agrega el servicio Greeter al servidor con sus implementaciones
  // ACCESO CORRECTO: greeterProto.<package_name>.<service_name>.service
  server.addService(greeterProto.greeter.Greeter.service, {
    SayHello: sayHello,
    SayHelloAgain: sayHelloAgain, // Añadido para implementar ambos métodos del proto
  });

  const port = greeterConfig.port; // Usa el puerto definido en la configuración
  const creds = grpc.ServerCredentials.createInsecure(); // Credenciales inseguras para desarrollo

  server.bindAsync(port, creds, (err, boundPort) => {
    if (err) process.exit(1); // Salir si hay un error al vincular el puerto

    console.log(`[Greeter Server] gRPC server running at ${port}`);
  });
}

// Ejecuta la función principal para iniciar el servidor
main();
