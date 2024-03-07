

 const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({


  productId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },

  productName: {
    type: String,
    
  },
 
  
  productImage: {
    type: Array,
   
  },
  
  price: {
    type: Number,
    
  },
  Description:{
    type: String,
   
  },
  category: {
    type: String,
    
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;