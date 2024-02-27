const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  address1: {
    type: String,
    reuired: true,
  },
  name: {
    type: String,
    required: true,
  },

  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "waiting for admin",
  },
  razor_orderId: {
    type: String,
  },
  razor_paymentId: {
    type: String,
  },
  razor_signature: {
    type: String,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  razor_refundId: {
    type: String,
  },
  refundStatus: {
    type: Boolean,
  },
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;