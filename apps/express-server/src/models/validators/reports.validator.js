const Joi = require("joi");

const CacheService = require("../../lib/cache");
const cache = new CacheService();

const CACHE_KEYS = require("../../constants/cache");

const queries = cache.findInCache(CACHE_KEYS.QUERIES);

const validateParams = (params, helpers) => {
  for (const queryId in params) {
    const query = queries.find((q) => q.id === parseInt(queryId));

    if (!query) {
      return helpers.error("any.invalid", {
        message: `Query with id ${queryId} not found`,
      });
    }

    const { field_type } = query;
    const value = params[queryId];

    switch (field_type) {
      case "NUMBER": {
        const { error } = Joi.number().validate(value);
        if (error) {
          return helpers.error("number.base", {
            message: `Value for query ${queryId} must be a number`,
          });
        }
        break;
      }
      case "TEXT": {
        const { error } = Joi.string().validate(value);
        if (error) {
          return helpers.error("string.base", {
            message: `Value for query ${queryId} must be a string`,
          });
        }
        break;
      }
      default:
        return helpers.error("any.invalid", {
          message: `Unsupported field_type: ${field_type}`,
        });
    }
  }

  return params;
};

module.exports = {
  validateParams,
};
