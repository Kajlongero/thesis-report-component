const url = require("url");
const path = require("path");

const { notFound } = require("@hapi/boom");

const CACHE_KEYS = require("../constants/cache");

const CacheService = require("./cache");
const cacheLoader = new CacheService();

const SERVICES_BASE_PATH = path.join(
  process.cwd(),
  "apps",
  "express-server",
  "src",
  "services"
);

const getObjectAndMethod = (body) => {
  const { tx, params, security } = body;

  const transactions = cacheLoader.findInCache(CACHE_KEYS.TRANSACTIONS);

  const data = transactions.get(tx);
  if (!data) throw new notFound("Transaction id invalid");

  const [_, objectName, methodName] = data.split("_");

  const obj = {
    objectName,
    methodName,
    security,
    params,
  };

  return obj;
};

const dynamicExecuteMethod = async (req, res, body) => {
  const { objectName, methodName, params } = getObjectAndMethod(body);

  let serviceInstance;

  if (!cacheLoader.hasInCache(CACHE_KEYS.OBJECT_METHODS_INSTANCES))
    cacheLoader.addToCache(CACHE_KEYS.OBJECT_METHODS_INSTANCES, new Map());

  const cache = cacheLoader.findInCache(CACHE_KEYS.OBJECT_METHODS_INSTANCES);

  serviceInstance = cache.get(objectName);

  if (!serviceInstance) {
    const servicePath = path.join(SERVICES_BASE_PATH, `${objectName}.js`);

    const { default: ServiceClass } = await import(
      url.pathToFileURL(servicePath).href
    );
    serviceInstance = new ServiceClass();

    const instancesMap = cacheLoader.findInCache(
      CACHE_KEYS.OBJECT_METHODS_INSTANCES
    );

    instancesMap.set(objectName, serviceInstance);
  }

  const asJson = typeof params === "string" ? JSON.parse(params) : params;

  const executedMethod = await serviceInstance[methodName](req, res, asJson);
  return executedMethod;
};

module.exports = { getObjectAndMethod, dynamicExecuteMethod };
