const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique:true
  },
  categoryImage: {
    type: Array,
    
  },
  
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;