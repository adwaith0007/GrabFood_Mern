const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");

const invoiceController = require("../Controllers/invoiceControllers");

const { isUserLoggedIn, isAdminLoggedIn } = require("../middlewares/Auth");
const { log } = require("handlebars");

// router.post('/placeOrder', (req, res) => {
//     orderControllers.placeOrder(req, res);
//   });

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

  router.get('/orders/products', (req, res) => {
    orderControllers.getProductOrders(req, res);
  });

  router.get('/orders/:orderId/:productId', (req, res) => {
    orderControllers.getOrderProductDetails(req, res);
  });

  router.get('/orders/:orderId', (req, res) => {
    orderControllers.getOrderDetailsAdmin(req, res);
  });

  router.get('/order/:orderId/reorder', (req, res) => {
    orderControllers.getOrderDetails(req, res);
  });

  router.put('/orders/:orderId/product/:productId', (req, res) => {
    orderControllers.updateProductStatus(req, res);
  });


  router.put('/orders/status/:orderId', (req, res) => {
    orderControllers.updateOrderStatus(req, res);
  });

  router.get("/order/invoice/:orderId" , (req, res) => {
   
    
    invoiceController.generateInvoice(req, res);
  });

  router.put('/order/cancel/:orderId/product/:productId', orderControllers.cancelProduct);

  router.put('/order/cancel/:orderId' , (req, res) => {
    orderControllers.cancelOrder(req, res);
  });

  router.get('/order/:userId/transactions', orderControllers.getAllTransactionsForUser);


  router.post("/order/filterDataByDate", (req, res) => {
    orderControllers.filterDataByDate(req, res);
  });


  router.get('/order/monthlyStats', orderControllers.calculateMonthlyStats);

module.exports = router;