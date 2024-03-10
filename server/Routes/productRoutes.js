const express = require("express");
const router = express.Router();
const productControllers = require("../Controllers/productControllers");

router.get("/get", (req, res) => {
  productControllers.listProduct(req, res);
});

router.post("/add", (req, res) => {
  productControllers.addProduct(req, res);
});

router.get("/:productId", productControllers.getProductDetails);


router.put("/update/:productId", (req, res) => {
  productControllers.updateProduct(req, res);
});


router.delete("/deleteImage/:productId", (req, res) => {
  productControllers.deleteImage(req, res);
});

router.delete("/delete/:productId", (req, res) => {
  productControllers.deleteProduct(req, res);
});

module.exports = router;
