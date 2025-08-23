const { notFound, badRequest, internal, unauthorized } = require("@hapi/boom");

const dbQueries = require("../../../../sql/querys.json");
const CACHE_KEYS = require("../constants/cache");

const CacheService = require("../lib/cache");

const { postgresInstance } = require("../components/db/db.definitions");
const {
  getPlaceholderById,
  createPlaceholder,
  updatePlaceholder,
} = require("../models/query");
const { ROLES } = require("../../../../packages/constants/roles");

const cache = new CacheService();

class QueryService {
  async GetAllPlaceholders(req, res) {
    const placeholders = cache.findInCache(
      CACHE_KEYS.PLACEHOLDERS_WITH_QUERIES
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: placeholders,
      message: "Success",
      statusCode: 200,
      error: "",
    };
  }

  async GetPlaceholderById(req, res, params) {
    const { id } = params;

    const { error } = getPlaceholderById.validate({ id });
    if (error) throw badRequest(error.details[0].message);

    const placeholders = cache.findInCache(CACHE_KEYS.PLACEHOLDERS);

    const placeholder = placeholders.find((q) => q.id === parseInt(id));
    if (!placeholder) throw notFound("Placeholders not found");

    return {
      data: placeholder,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }

  async CreatePlaceholder(req, res, params) {
    const { name, field, typeId, queryId, metadata } = params;

    const user = req.user;
    if (user.role[0] !== ROLES.OWNER)
      throw unauthorized("You do not have permission to perform this action");

    const { error } = createPlaceholder.validate(params);
    if (error) throw badRequest(error.details[0].message);

    const placeholders = cache.findInCache(CACHE_KEYS.PLACEHOLDERS);
    if (placeholders.find((q) => q.name === name))
      throw badRequest("Placeholder already exists");

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);
    if (!queries.find((q) => q.id === parseInt(queryId)))
      throw badRequest("Query does not exist");

    const findType = await postgresInstance.queryOne(
      dbQueries.placeholders.getPlaceholderTypeById,
      [typeId]
    );
    if (!findType) throw badRequest("Placeholder type does not exist");

    const created = await postgresInstance.queryOne(
      dbQueries.placeholders.createPlaceholder,
      [name, field, typeId, queryId, metadata ?? null]
    );
    if (!created) throw internal("Error creating placeholder");

    const allPlaceholders = [...placeholders, created];

    cache.addToCache(CACHE_KEYS.PLACEHOLDERS, allPlaceholders);

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    return {
      data: created,
      error: "",
      message: "Placeholder created successfully",
      statusCode: 201,
    };
  }

  async UpdateQuery(req, res, params) {
    const { id, name, field, typeId, queryId, metadata } = params;

    const user = req.user;
    if (user.role[0] !== "OWNER")
      throw unauthorized("You do not have permission to perform this action");

    const { error } = updatePlaceholder.validate(params);
    if (error) throw badRequest(error.details[0].message);

    const placeholders = cache.findInCache(CACHE_KEYS.PLACEHOLDERS);

    const placeholder = placeholders.findIndex((q) => q.id === parseInt(id));
    if (placeholder === -1) throw notFound("Placeholder not found");

    const queries = cache.findInCache(CACHE_KEYS.QUERIES);

    const queryIndex = queries.findIndex((q) => q.id === parseInt(queryId));
    if (queryIndex === -1) throw notFound("Query not found");

    const getTypeId = await postgresInstance.queryOne(
      dbQueries.placeholders.getPlaceholderTypeById,
      [typeId]
    );
    if (!getTypeId) throw notFound("Placeholder type does not exist");

    const updated = await postgresInstance.queryOne(
      dbQueries.placeholders.updatePlaceholder,
      [name, field, typeId, queryId, metadata ?? null, id]
    );
    if (!updated) throw internal("Error updating query");

    const allPlaceholders = [...placeholders];
    allPlaceholders[placeholder] = updated;

    cache.addToCache(CACHE_KEYS.QUERIES, allPlaceholders);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: updated,
      error: "",
      message: "Placeholder updated successfully",
      statusCode: 200,
    };
  }

  async DeleteQuery(req, res, params) {
    const { id } = params;

    const user = req.user;
    if (user.role[0] !== "OWNER")
      throw unauthorized("You do not have permission to perform this action");

    const { error } = getPlaceholderById.validate({ id });
    if (error) throw badRequest(error.details[0].message);

    const placeholders = cache.findInCache(CACHE_KEYS.PLACEHOLDERS);

    const placeholder = placeholders.findIndex((q) => q.id === parseInt(id));
    if (placeholder === -1) throw notFound("Placeholder not found");

    const deleted = await postgresInstance.queryOne(
      dbQueries.placeholders.deletePlaceholder,
      [id]
    );
    if (!deleted) throw internal("Error deleting query");

    const allPlaceholders = placeholders.filter((q) => q.id !== parseInt(id));

    cache.addToCache(CACHE_KEYS.QUERIES, allPlaceholders);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: { id: deleted.id },
      error: "",
      message: "Placeholder deleted successfully",
      statusCode: 200,
    };
  }
}

module.exports = QueryService;
