const express = require("express");
const router = express.Router();

const CartItem = require("../Models/CartItem");

const CartItemController = require("../Controllers/CartItemController");


// Create a new cart item
router.post('/cart', async (req, res) => {
    try {
      const { userId, productId, quantity,imageUrl,name,price } = req.body;
      const newItem = new CartItem({ userId, productId, quantity,imageUrl,name,price });
      await newItem.save();
      res.json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


//   router.post('/cart', (req, res) => {
//     CartItemController.AddCartItem(req, res);
//   });


  
  // Get all cart items for a user
  router.get('/api/cart/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const cartItems = await CartItem.find({ userId });
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Update a cart item quantity
  router.put('/api/cart/:itemId', async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const { quantity } = req.body;
      const updatedItem = await CartItem.findByIdAndUpdate(itemId, { quantity }, { new: true });
      res.json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete a cart item
  router.delete('/api/cart/:itemId', async (req, res) => {
    try {
      const itemId = req.params.itemId;
      await CartItem.findByIdAndDelete(itemId);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router;