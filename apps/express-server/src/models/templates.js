const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(255);
const description = Joi.string().min(3);
const isPublic = Joi.boolean();
const isActive = Joi.boolean();
const templateType = Joi.string();

const templateDefinitionSchema = Joi.object({
  raw: Joi.string().required(),
  delta: Joi.object().required(),
  placeholders: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      raw: Joi.string().required(),
      alias: Joi.string().required(),
      queryIds: Joi.array().items(Joi.string()).required(),
    })
  ),
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
  }, 'JSON string'),
  templateDefinitionSchema
);

const createTemplateSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  isPublic: isPublic.required(),
  templateType: templateType.required(),
  templateDefinition: templateDefinition.required(),
});

const updateTemplateSchema = Joi.object({
  id: id.required(),
  name: name,
  description: description,
  isPublic: isPublic,
  isActive: isActive,
  templateType: templateType,
  templateDefinition: templateDefinition,
});

const getTemplateByIdSchema = Joi.object({
  id: id.required(),
});

const getAllTemplatesSchema = Joi.object({
  limit: Joi.number().integer(),
  cursor: Joi.string(),
});

module.exports = {
  createTemplateSchema,
  updateTemplateSchema,
  getTemplateByIdSchema,
  getAllTemplatesSchema,
};
