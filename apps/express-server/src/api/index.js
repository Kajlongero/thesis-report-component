const { Router } = require("express");
const router = Router();

const ObjectMapperComponent = require("../components/object.mapper");
const mapper = new ObjectMapperComponent();

const dynamicExecuteMethod = require("../lib/dynamic.execution");
const validateTransactionPermission = require("../middlewares/validate.transaction.permission");

router.post(
  "/process",
  validateTransactionPermission,
  async (req, res, next) => {
    try {
      const { tx, params, security } = req.body;
      const data = mapper.findNames(tx);

      const obj = { ...data, params, security };
      const results = await dynamicExecuteMethod(req, res, obj);

      res.status(res.statusCode).json(results);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
