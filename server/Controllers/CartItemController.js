const CartItem = require("../Models/CartItem");


exports.AddCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const newItem = new CartItem({ userId, productId, quantity });
        await newItem.save();
        res.json(newItem);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  };