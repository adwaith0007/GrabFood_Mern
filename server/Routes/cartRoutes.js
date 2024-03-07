const express = require("express");
const router = express.Router();

const cartController = require("../Controllers/cartController");



router.post("/cart/add/:userId",  (req, res) => {
    cartController.add(req, res);
  });
  
  
  router.post("/cart/decrease/:userId", (req, res) => {
    cartController.decrease(req, res);
  });
  
  
  router.post("/cart/remove/:userId", (req, res) => {
    cartController.remove(req, res);
  });
  
  
  router.get('/cart/:userId', cartController.getCartItems);
  
  
  
  module.exports = router;