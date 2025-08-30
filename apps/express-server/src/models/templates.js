const Joi = require("joi");

const CacheService = require("../lib/cache");
const cache = new CacheService();

const CACHE_KEYS = require("../constants/cache");

const placeholders = cache.findInCache(CACHE_KEYS.PLACEHOLDERS);

const id = Joi.number().integer().min(1);
const limit = Joi.number().integer().min(1).max(50);
const cursor = Joi.string().allow(null, "");

const name = Joi.string().min(3).max(255);
const isActive = Joi.boolean();
const isPublic = Joi.boolean();
const description = Joi.string().min(3);
const templateTypeId = Joi.number().integer();
const placeholdersIds = Joi.array().items(...placeholders.map((p) => p.id));

const getAllTemplatesSchema = Joi.object({
  limit: limit,
  cursor: cursor,
});

const getTemplateByIdSchema = Joi.object({
  id: id.required(),
});

const deleteTemplateSchema = Joi.object({
  id: id.required(),
});

const templateDefinitionSchema = Joi.object({
  delta: Joi.object().required(),
});

const templateDefinition = Joi.alternatives().try(
  Joi.string().custom((value, helpers) => {
    try {
      const parsed = JSON.parse(value);
      const { error } = templateDefinitionSchema.validate(parsed);
      if (error) {
        return helpers.error("any.invalid");
      }
      return parsed;
    } catch (e) {
      return helpers.error("any.invalid");
    }
  }, "JSON string"),
  templateDefinitionSchema
);

const createTemplateSchema = Joi.object({
  name: name.required(),
  isActive: isActive,
  isPublic: isPublic.required(),
  description: description.required(),
  templateTypeId: templateTypeId.required(),
  placeholdersIds: placeholdersIds,
  templateDefinition: templateDefinition.required(),
});

const updateTemplateSchema = Joi.object({
  id: id.required(),
  name: name,
  isActive: isActive,
  isPublic: isPublic,
  description: description,
  templateTypeId: templateTypeId,
  placeholdersIds: placeholdersIds,
  templateDefinition: templateDefinition,
});

module.exports = {
  createTemplateSchema,
  updateTemplateSchema,
  getTemplateByIdSchema,
  getAllTemplatesSchema,
  deleteTemplateSchema,
};
