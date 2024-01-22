const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    
  },
 
  
  itemDesc: {
    type: String,
   
  },
  
  itemPrice: {
    type: Number,
    
  },
  itemCategory: {
    type: String,
   
  },
  itemImages: {
    type: Array,
    
  },
});

const itemModel = mongoose.model("foodItems", itemSchema);

module.exports = itemModel;