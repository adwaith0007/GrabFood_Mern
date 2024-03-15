const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    couponName: {
    type: String,
    required: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  discount: {
    type: Number,
    requires: true,
  },
  discountMax: {
    type: Number,
    requires: true,
  },
});

const couponModel = mongoose.model("coupon", couponSchema);

module.exports = couponModel;