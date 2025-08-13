const express = require("express");
const router = express.Router();

const validateSession = require("../middlewares/validate.session");
const validateTxPermission = require("../middlewares/validate.transaction.permission");

const { dynamicExecuteMethod } = require("../lib/dynamic.execution");

router.post(
  "/process",
  validateTxPermission,
  validateSession,
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
