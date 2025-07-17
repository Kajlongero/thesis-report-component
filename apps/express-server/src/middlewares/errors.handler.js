const boom = require("@hapi/boom");
const { MulterErrorsReducer } = require("../utils/multer.errors.reducer");

/** Middleware that throws an error if is Boom Type or delegate the error to another middleware
 *
 * @param {Error} err
 * @param {Express.Request} req
 * @param {*} res
 * @param {*} next
 * @returns {Express.Response}
 */

const TypeErrorHandler = (err, req, res, next) => {
  return next(err);
};

const BoomErrorHandler = (err, req, res, next) => {
  if (!err.isBoom) return next(err);

  const { payload } = err.output;
  return res.status(payload.statusCode).json(payload);
};

const ServerErrorHandler = (err, req, res, next) => {
  return res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: "An internal error has ocurred",
  });
};

module.exports = {
  BoomErrorHandler,
  TypeErrorHandler,
  ServerErrorHandler,
};
