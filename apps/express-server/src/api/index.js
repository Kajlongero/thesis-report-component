const { Router } = require("express");
const router = Router();

const MapComponent = require("../components/Map");
const mapComponent = new MapComponent();

router.post("/process", async () => {
  try {
    const { tx, params } = req.body;
    const data = mapComponent.findNames(tx);

    const obj = { ...data, params };
    const results = await dynamicExecuteMethod(req, res, obj);

    res.status(200).json(results);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
