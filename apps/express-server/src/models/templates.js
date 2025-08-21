const Joi = require("joi");

const id = Joi.number().integer().min(1);
const limit = Joi.number().integer().min(1).max(50);
const cursor = Joi.string().allow(null, "");

const name = Joi.string().min(3).max(255);
const isPublic = Joi.boolean();
const isActive = Joi.boolean();
const description = Joi.string().min(3);
const templateType = Joi.string();
const templateTypeId = Joi.number().integer();

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
  placeholders: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        raw: Joi.string().optional(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        alias: Joi.string().required(),
        fields: Joi.array().items(Joi.string()),
        queryIds: Joi.array().items(
          Joi.object({
            id: Joi.number(),
            query: Joi.string(),
          })
        ),
      })
    )
    .optional(),
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
  templateDefinition: templateDefinition.required(),
});

const updateTemplateSchema = Joi.object({
  id: id.required(),
  name: name,
  isActive: isActive,
  isPublic: isPublic,
  description: description,
  templateType: templateType,
  templateTypeId: templateTypeId,
  templateDefinition: templateDefinition,
});

module.exports = {
  createTemplateSchema,
  updateTemplateSchema,
  getTemplateByIdSchema,
  getAllTemplatesSchema,
  deleteTemplateSchema,
};
