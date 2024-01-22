const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: Array,
    
  },
  
});

const categoryModel = mongoose.model("foodCategory", categorySchema);

module.exports = categoryModel;