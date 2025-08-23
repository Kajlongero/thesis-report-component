const { postgresInstance } = require("../components/db/db.definitions");

const queries = require("../../../../sql/querys.json");
const CACHE_KEYS = require("../constants/cache");

const CacheService = require("./cache");

const cache = new CacheService();

const loadPlaceholders = async () => {
  const response = await postgresInstance.query(
    queries.placeholders.getAllPlaceholders,
    []
  );

  cache.addToCache(CACHE_KEYS.PLACEHOLDERS, response);

  return response;
};

const loadQueries = async () => {
  const response = await postgresInstance.query(
    queries.queries.getAllQueries,
    []
  );

  cache.addToCache(CACHE_KEYS.QUERIES, response);

  return response;
};

const loadPlaceholdersWithQueries = async () => {
  const response = await postgresInstance.query(
    queries.placeholders.getPlaceholdersWithQueries,
    []
  );

  cache.addToCache(CACHE_KEYS.PLACEHOLDERS_WITH_QUERIES, response);

  console.log("Loaded placeholders with queries into cache", cache.map);

  return response;
};

module.exports = { loadPlaceholdersWithQueries, loadPlaceholders, loadQueries };
