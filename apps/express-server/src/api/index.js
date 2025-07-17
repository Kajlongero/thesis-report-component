const { Router } = require("express");
const router = Router();

const MapComponent = require("../components/Map");
const mapComponent = new MapComponent();

const dynamicExecuteMethod = require("../lib/dynamic.execution");

router.post("/process", async (req, res, next) => {
  try {
    const { tx, params } = req.body;
    const data = mapComponent.findNames(tx);

    const obj = { ...data, params };
    const results = await dynamicExecuteMethod(req, res, obj);

    res.status(res.statusCode).json(results);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
