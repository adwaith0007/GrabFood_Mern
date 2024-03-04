const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");


router.post('/placeOrder', (req, res) => {
    orderControllers.placeOrder(req, res);
  });


module.exports = router;