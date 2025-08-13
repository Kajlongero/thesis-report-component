const Joi = require('joi');

const limit = Joi.number().integer().min(1).max(100);
const cursor = Joi.string();
const id = Joi.number().integer().min(1);

const getAllReportsSchema = Joi.object({
  limit: limit,
  cursor: cursor,
});

const getReportByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getAllReportsSchema,
  getReportByIdSchema,
};
