const Joi = require("joi");

const { validateParams } = require("./validators/reports.validator");

const id = Joi.number().integer().min(1);
const limit = Joi.number().integer().min(1).max(100);
const cursor = Joi.string().allow(null, "");

const getAllReportsSchema = Joi.object({
  limit: limit,
  cursor: cursor,
});

const getReportByIdSchema = Joi.object({
  id: id.required(),
});

const generateReportSchema = Joi.object({
  name: Joi.string().min(1).max(128).allow(""),
  params: Joi.object({}).custom(validateParams),
  formatId: Joi.number().integer().min(1).required(),
  templateId: Joi.number().integer().min(1).required(),
  description: Joi.string().min(0).max(256).allow(""),
});

module.exports = {
  getAllReportsSchema,
  getReportByIdSchema,
  generateReportSchema,
};
