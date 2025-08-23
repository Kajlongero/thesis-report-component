const { notFound, badRequest, internal } = require("@hapi/boom");

const CACHE_KEYS = require("../constants/cache");

const CacheService = require("../lib/cache");

const dbQueries = require("../../../../sql/querys.json");

const { postgresInstance } = require("../components/db/db.definitions");
const { getQueryById, createQuery, updateQuery } = require("../models/query");

const cache = new CacheService();

class QueryService {
  async GetAllQueries(req, res) {
    const queries = cache.findInCache(CACHE_KEYS.QUERIES);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: queries,
      message: "Success",
      statusCode: 200,
      error: "",
    };
  }

  async GetQueryById(req, res, params) {
    const { id } = params;

    const { error } = getQueryById.validate({ id });
    if (error) throw badRequest(error.details[0].message);

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);

    const query = queries.find((q) => q.id === parseInt(id));
    if (!query) throw notFound("Query not found");

    return {
      data: query,
      message: "Success",
      statusCode: 200,
      error: "",
    };
  }

  async CreateQuery(req, res, params) {
    const { queryText } = params;

    const { error } = createQuery.validate({ queryText });
    if (error) throw badRequest(error.details[0].message);

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);
    if (queries.find((q) => q.queryText === queryText))
      throw badRequest("Query already exists");

    const created = await postgresInstance.queryOne(
      dbQueries.queries.createQuery,
      [queryText]
    );
    if (!created) throw internal("Error creating query");

    const allQueries = [...queries, created];
    cache.addToCache(CACHE_KEYS.QUERIES, allQueries);

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    return {
      data: created,
      error: "",
      message: "Query created successfully",
      statusCode: 201,
    };
  }

  async UpdateQuery(req, res, params) {
    const { id, queryText } = params;

    const { error } = updateQuery.validate(params);
    if (error) throw badRequest(error.details[0].message);

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);

    const queryIndex = queries.findIndex((q) => q.id === parseInt(id));
    if (queryIndex === -1) throw notFound("Query not found");

    const query = queries[queryIndex];
    if (query.queryText === queryText)
      throw badRequest("Query defintion is the same");

    const updated = await postgresInstance.queryOne(
      dbQueries.queries.updateQuery,
      [id, queryText]
    );
    if (!updated) throw internal("Error updating query");

    const allQueries = [...queries];
    allQueries[queryIndex] = updated;

    cache.addToCache(CACHE_KEYS.QUERIES, allQueries);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: updated,
      error: "",
      message: "Query updated successfully",
      statusCode: 200,
    };
  }

  async DeleteQuery(req, res, params) {
    const { id } = params;

    const { error } = getQueryById.validate({ id });
    if (error) throw badRequest(error.details[0].message);

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);

    const queryIndex = queries.findIndex((q) => q.id === parseInt(id));
    if (queryIndex === -1) throw notFound("Query not found");

    const deleted = await postgresInstance.queryOne(
      dbQueries.queries.deleteQuery,
      [id]
    );
    if (!deleted) throw internal("Error deleting query");

    const allQueries = queries.filter((q) => q.id !== parseInt(id));

    cache.addToCache(CACHE_KEYS.QUERIES, allQueries);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: { id: deleted.id },
      error: "",
      message: "Query deleted successfully",
      statusCode: 200,
    };
  }
}

module.exports = QueryService;
