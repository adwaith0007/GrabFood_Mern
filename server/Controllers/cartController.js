const UserModel = require("../Models/userModels");
const prodModel = require("../Models/product");
const jwt = require("jsonwebtoken");


// exports.add = async (req, res) => {
//   const { userId } = req.params;

//   const {
//     product: {
//       productId,
//       productName,
//       productImage,
//       price,
//       Description,
//       category,
//     },
//     quantity,
//   } = req.body;

//   console.log(productId);

//   const image = productImage[0];

//   const itemExists = await UserModel.findOne({
//     cart: { $elemMatch: { productId: productId } },
//   });

  

//   if (itemExists !== null) {
//     console.log("Item exists in the cart.");

//     try {
//       await UserModel.updateOne(
//         { _id: userId, "cart.productId": productId },
//         { $inc: { "cart.$.quantity": 1 } }
//       );
//       return res.status(200).json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log("error while incrementing the quantity", error);
//       return res.json({ success: false, message: "Error while incrementing" });
//     }
//   } else {
//     console.log("Item does not exist in the cart.");

//     const cartItems = {
//       productId,
//       productName,
//       productImage: image,
//       quantity,
//       price,
//     };

//     console.log(cartItems);

//     try {
//       UserModel.updateOne({ _id: userId }, { $push: { cart: cartItems } })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//       return res.status(200).json({ success: true, message: "Added to cart" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Error white adding to cart collection",
//       });
//     }
//   }
// };


exports.add = async (req, res) => {
  const { userId } = req.params;

  const {
    product: {
      productId,
      productName,
      productImage,
      price,
      Description,
      category,
    },
    quantity,
  } = req.body;

  const maxQuantity = 5; 

  console.log(productId);

  const image = productImage[0];

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const existingCartItem = user.cart.find((item) => item.productId === productId);

  const validateQuantity = (existingQuantity, newQuantity) => {
    const totalQuantity = existingQuantity + newQuantity;
    return totalQuantity <= maxQuantity;
  };

  if (existingCartItem) {
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
    console.log("Item does not exist in the cart.");

    if (!validateQuantity(0, quantity)) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more than ${maxQuantity} items to the cart`,
      });
    }

    const cartItems = {
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

exports.decrease = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  console.log(req.body);

  const {
    product: { _id: productId, productName, productImage },
    quantity,
  } = req.body;

  console.log(productName);

  const itemExists = await UserModel.findOne({
    cart: { $elemMatch: { productId: productId } },
  });

  console.log(itemExists);

  if (itemExists !== null) {
    console.log("Item exists in the cart.");

    try {
      await UserModel.updateOne(
        { _id: userId, "cart.productId": productId },
        { $dec: { "cart.$.quantity": 1 } }
      );
      return res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.log("error while incrementing the quantity", error);
      return res.json({ success: false, message: "Error while incrementing" });
    }
  } else {
    console.log("Item does not exist in the cart.");
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

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
