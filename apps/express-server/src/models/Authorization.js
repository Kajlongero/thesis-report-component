const Joi = require('joi');

const role = Joi.string().required();
const method = Joi.string().required();

const userHasPermissionSchema = Joi.object({
  role: role,
  method: method,
});

module.exports = {
  userHasPermissionSchema,
};