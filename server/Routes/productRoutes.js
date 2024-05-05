const express = require("express");
const router = express.Router();
const productControllers = require("../Controllers/productControllers");
const { isUserLoggedIn, isAdminLoggedIn , verifyToken } = require("../middlewares/Auth");

router.get("/get", (req, res) => {
  console.log("all p")
  productControllers.listProduct(req, res);
});

router.get("/get_best", isUserLoggedIn, (req, res) => {
  console.log('inn');
  
  productControllers.listBestProduct(req, res);
});

router.get("/get_LowToHigh", isUserLoggedIn, (req, res) => {
  console.log('inn');
  
  productControllers.listLowToHighProduct(req, res);
});

router.get("/get_HighToLow",isUserLoggedIn, (req, res) => {
  console.log('inn');
  
  productControllers.listHighToLowProduct(req, res);
});

router.get("/search",isUserLoggedIn, (req, res) => {
  productControllers.searchProduct(req, res);
});


router.post("/add",isUserLoggedIn, (req, res) => {
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
