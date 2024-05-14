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
  profilePicture: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
},


  addresses: [
    {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
  ],
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  cart: [
    {
      productId: {
        type: String,
        required: true,
      },

      

      productName: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
      productImage: {
        type: [String],
      },
      discountPrice: {
        type: Number,
      },
    },
  ],
  // wallet: {
  //   balance: {
  //     type: Number,
  //     default: 0,
  //   },
  // },

  wallet: [
    {
      amount: {
        type: Number,
        // required: true
      },
      type: {
        type: String,
        enum: ['credit', 'debit'],
        // required: true
      },
     
      date: {
        type: String,
        // default: Date.now
      }
    },
    
  ],

  walletBalance: { 
    type: Number,
    default: 0,
  },

  wishlist:[
    {

      productId: {
        type: String,
        required: true,
      },

      

      productName: {
        type: String,
      },

      productImage: {
        type: String,
      },

      price: {
        type: Number,
      },


    }
  ]





});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;