const Joi = require("joi");

const getQueryById = Joi.object({
  id: Joi.number().integer().required(),
});

const createQuery = Joi.object({
  queryText: Joi.string().required(),
});

const updateQuery = Joi.object({
  id: Joi.number().integer().required(),
  queryText: Joi.string().required(),
});

const getPlaceholderById = Joi.object({
  id: Joi.number().integer().required(),
});

const createPlaceholder = Joi.object({
  name: Joi.string().required(),
  field: Joi.string().required(),
  typeId: Joi.number().integer().required(),
  queryId: Joi.number().integer().required(),
  metadata: Joi.object(),
});

const updatePlaceholder = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string(),
  field: Joi.string(),
  typeId: Joi.number().integer(),
  queryId: Joi.number().integer(),
  metadata: Joi.object(),
});

module.exports = {
  createQuery,
  updateQuery,
  getQueryById,
  getPlaceholderById,
  createPlaceholder,
  updatePlaceholder,
};
