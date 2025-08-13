const Joi = require("joi");

const id = Joi.number().integer().min(1);
const limit = Joi.number().integer().min(1).max(50);
const cursor = Joi.string().allow(null, "");

const getAllTemplatesSchema = Joi.object({
  limit: limit,
  cursor: cursor,
});

const getTemplateByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getAllTemplatesSchema,
  getTemplateByIdSchema,
};
