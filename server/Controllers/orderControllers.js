const orderModel = require("../Models/orderModel");

const UserModel = require("../Models/userModels");



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

        const user = await UserModel.findById(userId);

        console.log(req.body);
        const newOrder = new orderModel({
          userId,
          userName:user.username,
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


    // exports.getAllOrders = async (req, res) => {
    //   try {
    //     const result = await orderModel.aggregate([
    //       { $unwind: '$products' }, // Unwind the 'products' array
    //       {
    //         $group: {
    //           _id: {
    //             productId: '$products.productId',
    //             productName: '$products.productName',
    //           },
    //           totalQuantity: { $sum: '$products.quantity' },
    //         },
    //       },
    //     ]);
    
    //     res.status(200).json({ success: true, allOrders: result });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   } finally {
    //     // Close the MongoDB connection (if needed)
    //     // mongoose.connection.close(); // Uncomment this line if you need to close the connection
    //   }
    // };



    // exports.getAllOrders = async (req, res) => {
    //   try {
    //     const result = await orderModel.aggregate([
    //       { $unwind: '$products' }, // Unwind the 'products' array
    //       {
    //         $group: {
    //           _id: {
    //             orderId: '$_id',
    //             productId: '$products.productId',
    //             productName: '$products.productName',
    //           },
    //           totalQuantity: { $sum: '$products.quantity' },
    //           totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
    //           overallStatus: { $push: '$products.status' }, // Store all product statuses in an array
    //         },
    //       },
    //       {
    //         $project: {
    //           _id: '$_id.orderId', // Use orderId as the final _id
    //           productName: '$_id.productName',
    //           totalQuantity: 1,
    //           totalPrice: 1,
    //           overallStatus: {
    //             $cond: {
    //               if: { $in: ['Delivered', '$overallStatus'] },
    //               then: 'Delivered',
    //               else: {
    //                 $cond: {
    //                   if: { $in: ['Shipped', '$overallStatus'] },
    //                   then: 'Shipped',
    //                   else: 'Processing',
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: '$_id', // Group by orderId
    //           allOrders: {
    //             $push: {
    //               productName: '$productName',
    //               totalQuantity: '$totalQuantity',
    //               totalPrice: '$totalPrice',
    //               status: '$overallStatus',
    //             },
    //           },
    //         },
    //       },
    //     ]);
    
    //     res.status(200).json({ success: true, allOrders: result });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   } finally {
    //     // Close the MongoDB connection (if needed)
    //     // mongoose.connection.close(); // Uncomment this line if you need to close the connection
    //   }
    // };


    // exports.getAllOrders = async (req, res) => {
    //   try {
    //     const result = await orderModel.aggregate([
    //       { $unwind: '$products' }, // Unwind the 'products' array
    //       {
    //         $group: {
    //           _id: {
    //             productId: '$products.productId',
    //             productName: '$products.productName',
    //           },
    //           totalQuantity: { $sum: '$products.quantity' },
    //           totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
    //           overallStatus: {
    //             $min: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 'Processing',
    //                 'Delivered',
    //               ],
    //             },
    //           },
    //           countProcessing: {
    //             $sum: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 1,
    //                 0,
    //               ],
    //             },
    //           },
    //         },
    //       },
    //     ]);
    
    //     res.status(200).json({ success: true, allOrders: result });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   } finally {
    //     // Close the MongoDB connection (if needed)
    //     // mongoose.connection.close(); // Uncomment this line if you need to close the connection
    //   }
    // };
    

    // ok code 1

    // exports.getAllOrders = async (req, res) => {
    //   try {
    //     const result = await orderModel.aggregate([
    //       { $unwind: '$products' }, // Unwind the 'products' array
    //       {
    //         $group: {
    //           _id: {
    //             productId: '$products.productId',
    //             productName: '$products.productName',
    //           },
    //           totalQuantity: { $sum: '$products.quantity' },
    //           totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
    //           overallStatus: {
    //             $min: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 'Processing',
    //                 'Delivered',
    //               ],
    //             },
    //           },
    //           countProcessing: {
    //             $sum: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 '$products.quantity',
    //                 0,
    //               ],
    //             },
    //           },
    //         },
    //       },
    //     ]);
    
    //     res.status(200).json({ success: true, allOrders: result });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   } finally {
    //     // Close the MongoDB connection (if needed)
    //     // mongoose.connection.close(); // Uncomment this line if you need to close the connection
    //   }
    // };



    exports.getAllOrders = async (req, res) => {
      try {
        const result = await orderModel.aggregate([
          { $unwind: '$products' }, // Unwind the 'products' array
          {
            $group: {
              _id: {
                productId: '$products.productId',
                productName: '$products.productName',
              },
              totalQuantity: { $sum: '$products.quantity' },
              totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
              overallStatus: {
                $min: {
                  $cond: [
                    { $eq: ['$countProcessing', 0] },
                    'Delivered',
                    'Pending',
                  ],
                },
              },
              countProcessing: {
                $sum: {
                  $cond: [
                    { $eq: ['$products.status', 'Processing'] },
                    '$products.quantity',
                    0,
                  ],
                },
              },
            },
          },
        ]);
    
        res.status(200).json({ success: true, allOrders: result });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      } finally {
        // Close the MongoDB connection (if needed)
        // mongoose.connection.close(); // Uncomment this line if you need to close the connection
      }
    };


    // exports.getAllOrders = async (req, res) => {
    //   try {
    //     const result = await orderModel.aggregate([
    //       { $unwind: '$products' }, // Unwind the 'products' array
    //       {
    //         $group: {
    //           _id: {
    //             productId: '$products.productId',
    //             productName: '$products.productName',
    //             userName: '$userName', // Include userName in the group
    //           },
    //           totalQuantity: { $sum: '$products.quantity' },
    //           totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
    //           overallStatus: {
    //             $min: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 'Processing',
    //                 'Delivered',
    //               ],
    //             },
    //           },
    //           countProcessing: {
    //             $sum: {
    //               $cond: [
    //                 { $eq: ['$products.status', 'Processing'] },
    //                 '$products.quantity',
    //                 0,
    //               ],
    //             },
    //           },
    //         },
    //       },
    //     ]);
    
    //     res.status(200).json({ success: true, allOrders: result });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    //   } 
    // };


    exports.getOrderProductDetails = async (req, res) => {
      const { orderId, productId } = req.params;
    
      try {
        // Find the order by orderId and productId
        const order = await orderModel.findOne({
          _id: orderId,
          'products.productId': productId
        });

        console.log(order);
        
    
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        // Extract relevant information
        const {
          userName,
          orderDate,
          paymentMethod,
          address,
          products
        } = order;
    
        // Find the product within the order
        const product = products.find(p => p.productId.toString() === productId);
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found in the order' });
        }
    
        // Extract product details
        const {
          productName,
          productImage,
          price,
          quantity,
          status
        } = product;
    
        // Send the response with the extracted data
        res.json({
          userName,
          orderDate,
          paymentMethod,
          address,
          productName,
          productImage,
          price,
          quantity,
          status
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


    exports.updateProductStatus = async (req, res) => {

      
        const { orderId, productId } = req.params;
        const { status } = req.body;
      
        try {
          
          const order = await orderModel.findById(orderId);
      
          if (!order) {
            return res.status(404).json({ error: 'Order not found' });
          }
      
          
          const productIndex = order.products.findIndex((product) => product.productId.toString() === productId);
      
          if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in the order' });
          }
      
          order.products[productIndex].status = status;
      
          
          const updatedOrder = await order.save();
      
          
          res.json(updatedOrder);
        } catch (error) {
          console.error('Error updating product status:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      

    }