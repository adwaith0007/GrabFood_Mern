const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");


router.post('/placeOrder', (req, res) => {
    orderControllers.placeOrder(req, res);
  });

  router.get('/order/user/:userId', (req, res) => {
    orderControllers.getUserOrders(req, res);
  });

  router.put('/order/cancel/:orderId/product/:productId', orderControllers.cancelProduct);


module.exports = router;