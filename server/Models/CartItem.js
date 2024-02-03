const mongoose = require("mongoose");


const CartItemSchema = mongoose.Schema( {
    userId:{

        type:String,
    } ,

    productId: {

        type:[String],
    } ,

    name: {

        type:[String],
    } ,
    price: {

        type:[Number],
    } ,
    imageUrl: {

        type:[String],
    } ,
    quantity: {

        type:[Number],
    } ,
  });


  const CartItemtModel = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItemtModel;


