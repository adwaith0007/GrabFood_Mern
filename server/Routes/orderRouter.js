const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");




router.post('/placeOrder', (req, res) => {
    orderControllers.placeOrder(req, res);
  });

  router.post('/checkout', (req, res) => {
    orderControllers.checkout(req, res);
  });

  router.post('/paymentverification', (req, res) => {
    orderControllers.paymentverification(req, res);
  });

  router.get('/order/user/:userId', (req, res) => {
    orderControllers.getUserOrders(req, res);
  });

  router.get('/orders', (req, res) => {
    orderControllers.getAllOrders(req, res);
  });

  router.get('/orders/:orderId/:productId', (req, res) => {
    orderControllers.getOrderProductDetails(req, res);
  });

  router.put('/orders/:orderId/product/:productId', (req, res) => {
    orderControllers.updateProductStatus(req, res);
  });

  router.put('/order/cancel/:orderId/product/:productId', orderControllers.cancelProduct);


module.exports = router;