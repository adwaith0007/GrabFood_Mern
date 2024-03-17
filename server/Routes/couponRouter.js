const express = require("express");
const router = express.Router();
const couponControllers = require("../Controllers/couponController");


router.post('/add', (req, res) => {
    couponControllers.addCoupon(req, res);
  });

  router.get('/get', (req, res) => {
    couponControllers.getCoupons(req, res);
  });

  router.post('/apply', (req, res) => {
    couponControllers.applyCoupon(req, res);
  });





module.exports = router;