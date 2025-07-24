const { Router } = require("express");
const router = Router();

const { dynamicExecuteMethod } = require("../lib/dynamic.execution");
const validateTransactionPermission = require("../middlewares/validate.transaction.permission");

router.post(
  "/process",
  validateTransactionPermission,
  async (req, res, next) => {
    try {
      const body = req.body;
      const results = await dynamicExecuteMethod(req, res, body);

      res.status(res.statusCode).json(results);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
