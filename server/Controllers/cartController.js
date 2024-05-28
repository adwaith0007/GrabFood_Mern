const UserModel = require("../Models/userModels");
// const prodModel = require("../Models/product");
const productModel = require("../Models/product");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');



// exports.add = async (req, res) => {
//   const { userId } = req.params;

//   let {
//     product: {
//       productId,
//       productName,
//       productImage,
//       price,
//       discountPrice,
//       offerInPercentage,
//       Description,
//       category,
//     },
//     quantity,
//   } = req.body;

//   if(discountPrice){
//     price=discountPrice
//   }

//   const maxQuantity = 5; 

//   console.log(productId);

//   const image = productImage[0];

//   const user = await UserModel.findById(userId);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   const existingCartItem = user.cart.find((item) => item.productId === productId);

//   const validateQuantity = (existingQuantity, newQuantity) => {
//     const totalQuantity = existingQuantity + newQuantity;
//     return totalQuantity <= maxQuantity;
//   };

//   if (existingCartItem) {
//     console.log("Item exists in the cart.");

//     try {
//       const existingQuantity = existingCartItem.quantity;

//       if (!validateQuantity(existingQuantity, 1)) {
//         return res.status(400).json({
//           success: false,
//           message: `Cannot add more than ${maxQuantity} items to the cart`,
//         });
//       }

//       await UserModel.updateOne(
//         { _id: userId, "cart.productId": productId },
//         { $inc: { "cart.$.quantity": 1 } }
//       );

//       return res.status(200).json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log("Error while incrementing the quantity", error);
//       return res.json({ success: false, message: "Error while incrementing" });
//     }
//   } else {
//     console.log("Item does not exist in the cart.");

//     if (!validateQuantity(0, quantity)) {
//       return res.status(400).json({
//         success: false,
//         message: `Cannot add more than ${maxQuantity} items to the cart`,
//       });
//     }

//     const cartItems = {
//       userName: user.username,
//       productId,
//       productName,
//       productImage: image,
//       quantity,
//       price,
//     };

//     console.log(cartItems);

//     try {
//       await UserModel.updateOne({ _id: userId }, { $push: { cart: cartItems } });
//       return res.status(200).json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error while adding to cart collection",
//       });
//     }
//   }
// };


exports.add = async (req, res) => {
  const { userId } = req.params;

  let {
    product: {
      productId,
      productName,
      productImage,
      price,
      discountPrice,
      offerInPercentage,
      Description,
      category,
    },
    quantity,
  } = req.body;

  // Check if discountPrice is available and update the price accordingly
  if (discountPrice) {
    price = discountPrice;
  }

  const maxQuantity = 5;

  const image = productImage[0];

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Check if the product exists in the wishlist and remove it
  const existingWishlistItemIndex = user.wishlist.findIndex(
    (item) => item.productId === productId
  );

  if (existingWishlistItemIndex !== -1) {
    user.wishlist.splice(existingWishlistItemIndex, 1);
    await user.save();
  }

  // Check if the product exists in the cart
  const existingCartItem = user.cart.find((item) => item.productId === productId);

  // Function to validate quantity
  const validateQuantity = (existingQuantity, newQuantity) => {
    const totalQuantity = existingQuantity + newQuantity;
    return totalQuantity <= maxQuantity;
  };

  if (existingCartItem) {
    // If the item already exists in the cart, increment the quantity
    console.log("Item exists in the cart.");

    try {
      const existingQuantity = existingCartItem.quantity;

      if (!validateQuantity(existingQuantity, 1)) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more than ${maxQuantity} items to the cart`,
        });
      }

      await UserModel.updateOne(
        { _id: userId, "cart.productId": productId },
        { $inc: { "cart.$.quantity": 1 } }
      );

      return res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.log("Error while incrementing the quantity", error);
      return res.json({ success: false, message: "Error while incrementing" });
    }
  } else {
    // If the item does not exist in the cart, add it as a new item
    console.log("Item does not exist in the cart.");

    if (!validateQuantity(0, quantity)) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more than ${maxQuantity} items to the cart`,
      });
    }

    const cartItems = {
      userName: user.username,
      productId,
      productName,
      productImage: image,
      quantity,
      price,
    };

    console.log(cartItems);

    try {
      await UserModel.updateOne({ _id: userId }, { $push: { cart: cartItems } });
      return res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while adding to cart collection",
      });
    }
  }
};

exports.addToCartFromWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;

    console.log('Adding product to cart. UserId:', userId, 'ProductId:', productId);

    const user = await UserModel.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const productIndex = user.wishlist.findIndex(product => product.productId === productId);

    if (productIndex === -1) {
      console.log("Product not found in wishlist");
      return res.status(404).json({ success: false, message: "Product not found in wishlist" });
    }

    const product = user.wishlist[productIndex];

    
    user.wishlist.splice(productIndex, 1);

    
    user.cart.push(product);

    await user.save();

    console.log("Product added to cart");

    
    return res.status(200).json({ success: true, message: "Product added to cart", data: user.wishlist });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};





exports.decrease = async (req, res) => {
  const { userId } = req.params;
  const { product: { productId, productName }, quantity } = req.body;



  try {
    
    const itemExists = await UserModel.findOne({
      _id: userId,
      "cart.productId": productId,
      "cart.quantity": { $gt: 1 }
    });

   
    

    if (itemExists) {
      
      const updateResult = await UserModel.updateOne(
        { _id: userId, "cart.productId": productId },
        { $inc: { "cart.$.quantity": -1 } }
      );

      
      

      return res.status(200).json({ success: true, message: "Decreased quantity in cart" });
    } else {
      
      console.log("Item does not exist in the cart or quantity is 1.");
      return res.status(404).json({ success: false, message: "Item does not exist in the cart or quantity is 1." });
    }
  } catch (error) {
    
    console.error("Error while decrementing the quantity:", error);
    return res.status(500).json({ success: false, message: "Error while decrementing" });
  }
};


exports.remove = async (req, res) => {
  const { userId } = req.params;

  const {
    product: { _id: productId },
  } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await UserModel.updateOne(
      { _id: userId },
      { $pull: { cart: { _id: productId } } }
    );

    const updatedUser = await UserModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: "Item Removed",
      cartItems: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting: backend error" });
  }
};

// exports.getCartItems = async (req, res) => {
//   const { userId } = req.params;

//   console.log("getCartItems", userId )

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }


//     const productDetails = await productModel.find({ _id: { $in: user.cart.productId } });

    
    

//     return res.status(200).json({ cart: user.cart });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// exports.getCartItems = async (req, res) => {
//   const { userId } = req.params;

//   console.log("getCartItems", userId);

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const productIds = user.cart.map(item => mongoose.Types.ObjectId(item.productId));
//     const products = await productModel.find({ _id: { $in: productIds } });

//     const cartItems = user.cart.map(cartItem => {
//       const product = products.find(prod => prod._id.equals(cartItem.productId));
//       return {
//         productId: cartItem.productId,
//         price: product ? product.price : null,
//         image: product ? product.productImage : null,
//         deleted: product ? product.deleted : null,
//         discountPrice: product ? product.discountPrice : null
//       };
//     });

//     return res.status(200).json({ cart: cartItems });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  console.log("getCartItems - userId:", userId);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    const productIds = user.cart.map(item => new mongoose.Types.ObjectId(item.productId));
    console.log("Product IDs in cart:", productIds);

    const products = await productModel.find({ _id: { $in: productIds } });
    console.log("Fetched products:", products);

    const cartItems = user.cart.map(cartItem => {
      const product = products.find(prod => prod._id.equals(cartItem.productId));
      const cartItemDetails = {
        productId: cartItem.productId,
        productName: cartItem.productName, // Add productName to cartItemDetails
        quantity: cartItem.quantity, // Add quantity to cartItemDetails
        price: product ? product.price : null,
        productImage: product ? product.productImage : null,
        deleted: product ? product.deleted : null,
        discountPrice: product ? product.discountPrice : null
      };
      console.log("Cart item details:", cartItemDetails);
      return cartItemDetails;
    });

    console.log("Final cart items:", cartItems);

    return res.status(200).json({ cart: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// exports.getCartItems = async (req, res) => {
//   const { userId } = req.params;

//   console.log("getCartItems", userId )

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Fetch latest details for each product in the user's cart
//     const updatedCart = await Promise.all(user.cart.map(async (item) => {
//       const product = await prodModel.findById(item.productId);
//       if (product) {
//         // Update the price and images in the cart item
//         return {
//           ...item.toObject(),
//           price: product.price,
//           productImage: product.images,
//         };
//       } else {
//         // If product not found, keep the cart item as it is
//         return item;
//       }
//     }));

//     // Update the user's cart with the latest details
//     user.cart = updatedCart;
//     await user.save();

//     return res.status(200).json({ cart: updatedCart });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


exports.deleteCartItems =  async (req, res) => {
  const { userId } = req.body;

  try {
    
    await UserModel.updateOne(
      { _id: userId },
      { $set: { cart: [] } }
    );

    res.status(200).json({ message: 'Cart items deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}