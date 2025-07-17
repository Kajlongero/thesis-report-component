const path = require("path");
const CacheLoader = require("./instance.loader");

const cacheLoader = CacheLoader.getInstance();

const SERVICES_BASE_PATH = path.join(
  process.cwd(),
  "apps",
  "express-server",
  "src",
  "services"
);

const dynamicExecuteMethod = async (req, res, body) => {
  const method = body.methodName;
  const object = body.objectName;
  const params = body.params;

  let serviceInstance;

  serviceInstance = instanceLoader.findInstance(object);

  if (!serviceInstance) {
    const servicePath = path.join(SERVICES_BASE_PATH, `${object}.js`);

    const { default: ServiceClass } = await import(servicePath);
    serviceInstance = new ServiceClass();

    instanceLoader.saveInstance(object, serviceInstance);
  }

  const executeMethod = await serviceInstance[method](req, res, params);
  return executeMethod;
};

module.exports = dynamicExecuteMethod;
