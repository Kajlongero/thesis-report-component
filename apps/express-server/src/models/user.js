const Joi = require('joi');

const firstName = Joi.string().min(3).max(30).required();
const lastName = Joi.string().min(3).max(30).required();

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
});

module.exports = {
  updateUserSchema,
};
