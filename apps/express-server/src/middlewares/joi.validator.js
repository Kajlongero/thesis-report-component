const { badRequest } = require("@hapi/boom");
const { nestedAccess } = require("../utils/nested.access");

const validateSchema =
  (schema, ...internalProperties) =>
  (req, res, next) => {
    const data = nestedAccess(req, ...internalProperties);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) next(new badRequest(error));

    next();
  };

module.exports = { validateSchema };
