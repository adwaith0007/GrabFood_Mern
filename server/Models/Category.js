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
  offerInPercentage: {
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
  
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;