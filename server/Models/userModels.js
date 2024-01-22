const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    
  },
  lname: {
    type: String,
    
  },

  username: {
    type: String,
    lowercase: true,
    unique : true,
  },



  email: {
    type: String,
    lowercase: true,
    unique : true,
  },
  phone: {
    type: Number,
    required: true,
  },
  addresses: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
  
  password: {
    type:String,
    required: true,
  }
  
  
  ,
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;