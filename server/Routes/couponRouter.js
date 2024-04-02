const express = require("express");
const router = express.Router();
const couponControllers = require("../Controllers/couponController");


router.post('/add', (req, res) => {
    couponControllers.addCoupon(req, res);
  });

  router.get('/get', (req, res) => {
    couponControllers.getCoupons(req, res);
  });

  router.get('/admin/get', (req, res) => {
    couponControllers.adminGetCoupons(req, res);
  });

  router.post('/apply', (req, res) => {
    couponControllers.applyCoupon(req, res);
  });

  router.delete('/delete/:couponId', (req, res) => {
    couponControllers.deleteCoupon(req, res);
  });




module.exports = router;