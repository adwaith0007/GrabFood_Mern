const UserModel = require("../Models/userModels");
const prodModel = require("../Models/product");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
  // const token = req.cookies.token;
  // const user = jwt.verify(token, "my_secret_key");

  const { userId } = req.params;

  console.log(userId);

  console.log(req.body);

  const {
    product: {
      _id: productId,
      productName,
      productImage,
      price,
      Description,
      category,
    },
    quantity,
  } = req.body;

  console.log(productName);

  // const image = images[0];

  const itemExists = await UserModel.findOne({
    cart: { $elemMatch: { productId: productId } },
  });

  console.log(itemExists);

  if (itemExists !== null) {
    console.log("Item exists in the cart.");
    // Perform actions when item exists in the cart

    try {
      await UserModel.updateOne(
        { _id: userId, "cart.productId": productId },
        { $inc: { "cart.$.quantity": 1 } }
      );
      return res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.log("error while incrementing the quantity", error);
      return res.json({ success: false, message: "Error while incrementing" });
    }
  } else {
    console.log("Item does not exist in the cart.");

    const cartItems = {
      productId,
      productName,
      quantity,
      price,
    };

    console.log(cartItems);
    

    // try {
    //   UserModel.updateOne({ _id: userId }, { $push: { cart: cartItems } })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   return res.status(200).json({ success: true, message: "Added to cart" });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Error white adding to cart collection",
    //   });
    // }
  }

  // if (itemExists) {
  //   try {
  //     await UserModel.updateOne(
  //       { _id: user.id, "cart.productId": productId },
  //       { $inc: { "cart.$.quantity": 1 } }
  //     );
  //     return res.status(200).json({ success: true, message: "Added to cart" });
  //   } catch (error) {
  //     console.log("error while incrementing the quantity", error);
  //     return res.json({ success: false, message: "Error while incrementing" });
  //   }
  // }
  // const cartItems = {
  //   productId,
  //   productName,
  //   quantity,
  //   price,
  //   image,
  //   discountPrice,
  // };

  // try {
  //   UserModel.updateOne({ _id: user.id }, { $push: { cart: cartItems } })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return res.status(200).json({ success: true, message: "Added to cart" });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Error white adding to cart collection",
  //   });
  // }
};
