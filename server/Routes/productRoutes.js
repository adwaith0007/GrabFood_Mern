const express = require("express");
const router = express.Router();
const productControllers = require("../Controllers/product");

router.get("/", (req, res) => {
  productControllers.listProduct(req, res);
});

router.post("/add", (req, res) => {
  productControllers.addProduct(req, res);
});

router.get("/:productId", productControllers.getProductDetails);

module.exports = router;
