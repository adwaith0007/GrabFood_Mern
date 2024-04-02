

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

  discountPrice: {
    type: Number,
    default: 0,
  },

  offerInPercentage: {
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
  },

  productWiseOffer:{
    type: Boolean,
    default: false,
  },
  categoryWiseOffer:{
    type: Boolean,
    default: false,
  }

});

productSchema.index({ productName: 'text', Description: 'text' });

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;