const orderModel = require("../Models/orderModel");



exports.placeOrder = async (req, res) => {

    console.log('hiii');
    
    try {
        const {
          userId,
          products,
          address,
          paymentMethod,
          // ... other order details
        } = req.body;
    
        // Assuming you have an Order model defined using Mongoose
        const newOrder = new orderModel({
          userId,
          products,
          address,
          paymentMethod,
          // ... other order details
        });
    
        // Save the order to the database
        const savedOrder = await newOrder.save();
    
        // You can perform additional actions here based on the order placement
        // ...
    
        res.status(201).json({ success: true, order: savedOrder });
      } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, error: 'Failed to place order. Please try again later.' });
      }
    };