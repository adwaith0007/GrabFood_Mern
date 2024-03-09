const orderModel = require("../Models/orderModel");



exports.placeOrder = async (req, res) => {

    
    
    try {
        const {
          userId,
          products,
          address,
          paymentMethod,
          orderDate,
          totalPrice
          
        } = req.body;

        if (!userId || !products || !Array.isArray(products) || products.length === 0 || !address || !paymentMethod || !orderDate || !totalPrice ) {
          return res.status(301).json({ success: false, message: "Please provide valid information for the order." });
        }

        console.log(req.body);
        const newOrder = new orderModel({
          userId,
          products,
          address,
          paymentMethod,
          orderDate,
          totalPrice
          
        });
    
        
        const savedOrder = await newOrder.save();
    
        res.status(201).json({ success: true, order: savedOrder });
      } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, error: 'Failed to place order. Please try again later.' });
      }
    };


    exports.getUserOrders = async (req, res) => {
      try {
        const userId = req.params.userId;
    
        // Assuming you want to retrieve orders for a specific user
        const userOrders = await orderModel.find({ userId });
    
        res.status(200).json({ success: true, orders: userOrders });
      } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch user orders. Please try again later.' });
      }
    };


    // exports.cancelProduct = async (req, res) => {

    //   console.log('hiiiii');
      

    //   const { orderId, productId } = req.params;
    
    //   try {
    //     // Find the order by ID
    //     const order = await orderModel.findById(orderId);
    
    //     // Find the index of the product to be canceled
    //     const productIndex = order.products.findIndex(
    //       (product) => product._id.toString() === productId
    //     );
    
    //     if (productIndex !== -1) {
    //       // Remove the product from the order
    //       order.products.splice(productIndex, 1);
    
    //       // Save the updated order
    //       const updatedOrder = await order.save();
    
    //       res.status(200).json({ success: true, order: updatedOrder });
    //     } else {
    //       res.status(404).json({ success: false, error: 'Product not found in order.' });
    //     }
    //   } catch (error) {
    //     console.error('Error canceling product:', error);
    //     res.status(500).json({ success: false, error: 'Failed to cancel product.' });
    //   }
    // };



    exports.cancelProduct = async (req, res) => {
      console.log('hiiii');
      
      try {
        const orderId = req.params.orderId;
        const productId = req.params.productId;
    
        const order = await orderModel.findById(orderId);

        // console.log(order);
        
    
        if (!order) {
          return res.status(404).json({ success: false, error: 'Order not found.' });
        }
    
        const canceledProductIndex = order.products.findIndex(product => product.productId.toString() === productId);

        
        
    
        if (canceledProductIndex === -1) {
          return res.status(404).json({ success: false, error: 'Product not found in the order.' });
        }
    
        const canceledProduct = order.products.splice(canceledProductIndex, 1)[0];
    
        const updatedOrder = await order.save();
    
        res.status(200).json({ success: true, message: 'Product canceled successfully.', canceledProduct, updatedOrder });
      } catch (error) {
        console.error('Error canceling product:', error);
        res.status(500).json({ success: false, error: 'Failed to cancel product. Please try again later.' });
      }
    };