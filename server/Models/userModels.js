const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String
});

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
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  addresses: {
    address1: AddressSchema,
    address2: AddressSchema
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;