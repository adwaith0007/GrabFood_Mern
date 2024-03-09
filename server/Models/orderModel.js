const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({



  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  orderDate: {
    type: String,
    required: true,
  },

  

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },

      productImage: {
        type: Array,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: Array,
    required: true,
  },

  paymentMethod: {
    type: String,
  },

  name: {
    type: String,
    // required: true,
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
    // required: true,
  },
  shipping: {
    type: Number,
    // required: true,
  },
  totalPrice: {
    type: Number,
    // required: true,
  },
  mode: {
    type: String,
    // required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Processing",
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
