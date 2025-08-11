const joi = require("joi");

const loginSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().min(8).max(64),
  })
  .required();

const registerSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().min(8).max(64),
    lastName: joi.string().min(1).max(64),
    firstName: joi.string().min(1).max(64),
  })
  .required();

module.exports = {
  loginSchema,
  registerSchema,
};
