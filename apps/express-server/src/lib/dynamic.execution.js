const url = require("url");
const path = require("path");
const CacheLoader = require("./cache.loader");

const cacheLoader = new CacheLoader();

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

  serviceInstance = cacheLoader.findInstance(object);

  if (!serviceInstance) {
    const servicePath = path.join(SERVICES_BASE_PATH, `${object}.js`);

    const { default: ServiceClass } = await import(
      url.pathToFileURL(servicePath).href
    );
    serviceInstance = new ServiceClass();

    cacheLoader.saveInstance(object, serviceInstance);
  }

  const executedMethod = await serviceInstance[method](req, res, params);
  return executedMethod;
};

module.exports = dynamicExecuteMethod;
