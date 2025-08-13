const Joi = require("joi");

const email = Joi.string().email().required();
const password = Joi.string().min(8).max(64).required();

const lastName = Joi.string().min(1).max(32).required();
const firstName = Joi.string().min(1).max(32).required();

const loginSchema = Joi.object({
  email: email,
  password: password,
});

const signupSchema = Joi.object({
  email: email,
  password: password,
  firstName: firstName,
  lastName: lastName,
});

const changeUserPasswordSchema = Joi.object({
  oldPassword: password,
  newPassword: password,
  closeAllSessions: Joi.boolean().optional(),
});

module.exports = {
  loginSchema,
  signupSchema,
  changeUserPasswordSchema,
};
