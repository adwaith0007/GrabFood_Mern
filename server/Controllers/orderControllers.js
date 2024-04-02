const orderModel = require("../Models/order");

const UserModel = require("../Models/userModels");

const Razorpay = require("razorpay");

const crypto = require("crypto");
const { log } = require("console");

require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});






exports.checkout = async (req, res) => {
  const { orderDetails, userId } = req.body;

  const options = {
    amount: Number(orderDetails.totalPrice * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  console.log(order);

  const user = await UserModel.findById(userId);

  const orderDoc = new orderModel({
    userId: orderDetails.userId,
    products: orderDetails.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImage,
      price: product.price,
      quantity: product.quantity,
    })),

    discountAmount: orderDetails.discountAmount,
    couponCode: orderDetails.couponCode,

    // coupon: couponId,
    // shipping,
    totalPrice: orderDetails.totalPrice,
    userName: user.username,
    address: orderDetails.address,
    orderDate: orderDetails.orderDate,
    paymentMethod: orderDetails.paymentMethod,

    phone: user.phone,

    razor_orderId: order.id,
  });
  orderDoc.save();

  res.status(200).json({
    success: true,
    order,
  });
};


exports.orderforWallet = async (req, res) => {
  const { orderDetails, userId } = req.body;

  try{

  const user = await UserModel.findById(userId);

  const orderDoc = new orderModel({
    userId: orderDetails.userId,
    products: orderDetails.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImage,
      price: product.price,
      quantity: product.quantity,
    })),

    discountAmount: orderDetails.discountAmount,
    couponCode: orderDetails.couponCode,

    // coupon: couponId,
    // shipping,
    totalPrice: orderDetails.totalPrice,
    userName: user.username,
    address: orderDetails.address,
    orderDate: orderDetails.orderDate,
    paymentMethod: orderDetails.paymentMethod,
    orderStatus:"Processing",
    paymentStatus:true,
    phone: user.phone,

    // preOrderId:orderDetails?._id,
    // preOrderStatus:orderDetails?.orderStatus

    
  });
  orderDoc.save();

    if(orderDetails.preOrderId){

      console.log('good');
      
      
      await orderModel.deleteOne({_id:orderDetails.preOrderId})

    }else{

      await UserModel.updateOne({ _id: userId }, { $set: { cart: [] } });

    }




    return res
      .status(200)
      .json({ success: true, message: "Your Order is placed" });
  } catch (error) {
    console.log("error while adding order for wallet", error);
  }
};



exports.orderCOD = async (req, res) => {
  const { orderDetails, userId } = req.body;

  try{

  const user = await UserModel.findById(userId);

  const orderDoc = new orderModel({
    userId: orderDetails.userId,
    products: orderDetails.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImage,
      price: product.price,
      quantity: product.quantity,
    })),

    discountAmount: orderDetails.discountAmount,
    couponCode: orderDetails.couponCode,

    // coupon: couponId,
    // shipping,
    totalPrice: orderDetails.totalPrice,
    userName: user.username,
    address: orderDetails.address,
    orderDate: orderDetails.orderDate,
    paymentMethod: orderDetails.paymentMethod,
    paymentStatus:false,
    phone: user.phone,

    
  });
  orderDoc.save();

    await UserModel.updateOne({ _id: userId }, { $set: { cart: [] } });

    return res
      .status(200)
      .json({ success: true, message: "Your Order is placed" });
  } catch (error) {
    console.log("error while adding order for wallet", error);
  }
};




// exports.placeOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       products,
//       address,
//       paymentMethod,
//       orderDate,
//       totalPrice,
//       couponId,
//     } = req.body;

//     if (
//       !userId ||
//       !products ||
//       !Array.isArray(products) ||
//       products.length === 0 ||
//       !address ||
//       !paymentMethod ||
//       !orderDate ||
//       !totalPrice
//     ) {
//       return res.status(301).json({
//         success: false,
//         message: "Please provide valid information for the order.",
//       });
//     }

//     const user = await UserModel.findById(userId);

//     console.log(req.body);
//     const newOrder = new orderModel({
//       userId,
//       userName: user.username,
//       products,
//       orderStatus,
//       couponId,
//       address,
//       paymentMethod,
//       orderDate,
//       totalPrice,
//     });

//     const savedOrder = await newOrder.save();

//     res.status(201).json({ success: true, order: savedOrder });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to place order. Please try again later.",
//     });
//   }
// };

// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.params.userId;

    
//     const userOrders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    

//     res.status(200).json({ success: true, orders: userOrders });
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch user orders. Please try again later.",
//     });
//   }
// };


exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    
    const userOrders = await orderModel.find({ userId}).sort({ createdAt: -1 });

   
    // const filteredOrders = userOrders.filter(order => order.paymentStatus === true || order.paymentMethod === "COD");

    res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user orders. Please try again later.",
    });
  }
};

exports.cancelProduct = async (req, res) => {
  console.log("hiiii");

  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    const order = await orderModel.findById(orderId);

    

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found." });
    }

    const canceledProductIndex = order.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (canceledProductIndex === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found in the order." });
    }

    const canceledProduct = order.products.splice(canceledProductIndex, 1)[0];

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Product canceled successfully.",
      canceledProduct,
      updatedOrder,
    });
  } catch (error) {
    console.error("Error canceling product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to cancel product. Please try again later.",
    });
  }
};




exports.cancelOrder = async (req, res) => {
  console.log("hiiii");

  try {
    const orderId = req.params.orderId;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found." });
    }

  
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled.",
      });
    }


    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order is already delivered and cannot be cancelled.",
      });
    }

    
    if (order.orderStatus === "Processing") {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { orderStatus: "Cancelled" } },
        { new: true }
      );

      if (
       ( order.paymentMethod === "onlinePayment" || order.paymentMethod === "Wallet" ) &&
        order.paymentStatus === true
      ) {
        const user = await UserModel.findOne({ username: order.userName });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, error: "User not found." });
        }

        user.wallet.balance += order.totalPrice;
        await user.save();
      }

      return res.status(200).json({
        success: true,
        message: "Order cancelled successfully.",
        updatedOrder: updatedOrder,
      });
    } else {
      
      return res.status(400).json({
        success: false,
        message:
          "Order can only be cancelled if it is in 'Processing' state.",
      });
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to cancel order. Please try again later.",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await orderModel.find({}).sort({ createdAt: -1 }); 

    res.status(200).json({ success: true, allOrders: result });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } 
};



exports.getProductOrders = async (req, res) => {
  try {
    const result = await orderModel.aggregate([
      { $unwind: "$products" }, // Unwind the 'products' array
      {
        $group: {
          _id: {
            productId: "$products.productId",
            productName: "$products.productName",
          },
          totalQuantity: { $sum: "$products.quantity" },
          totalPrice: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
          overallStatus: {
            $min: {
              $cond: [{ $eq: ["$countProcessing", 0] }, "Delivered", "Pending"],
            },
          },
          countProcessing: {
            $sum: {
              $cond: [
                { $eq: ["$products.status", "Processing"] },
                "$products.quantity",
                0,
              ],
            },
          },
        },
      },
    ]);

    res.status(200).json({ success: true, allOrders: result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
      "products.productId": productId,
    });

    console.log(order);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Extract relevant information
    const { userName, orderDate, paymentMethod, address, products } = order;

    // Find the product within the order
    const product = products.find((p) => p.productId.toString() === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    // Extract product details
    const { productName, productImage, price, quantity, status } = product;

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
      status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getOrderDetailsAdmin = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order by orderId and productId
    const order = await orderModel.findOne({
      _id: orderId
    });

    console.log(order);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Extract relevant information
    const { userName, orderDate, paymentMethod, orderStatus, 
      totalPrice, address, products, paymentStatus ,
      discountAmount } = order;

    // Find the product within the order
    // const product = products.find((p) => p.productId.toString() === productId);

    if (!products) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    // Extract product details
    // const { productName, productImage, price, quantity, status } = product;

    // Send the response with the extracted data
    res.json({
      userName,
      orderDate,
      paymentMethod,
      orderStatus,
      products,
      
discountAmount,
totalPrice,
      address,
      
      
paymentStatus
      
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    
    const order = await orderModel.findOne({
      _id: orderId
    });

    console.log(order);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.updateProductStatus = async (req, res) => {
  const { orderId, productId } = req.params;
  const { status } = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const productIndex = order.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    order.products[productIndex].status = status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};







exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Validate the status field
  if (!status || typeof status !== "string") {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const order = await orderModel.findById(orderId);

   
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

   
    if (order.orderStatus === "Processing" && status === "Delivered") {
      order.orderStatus = status;
    } else if (
      order.orderStatus === "Delivered" &&
      (status === "Delivered" || status === "Cancelled")
    ) {
      return res.json({ success: false, message: "Order already delivered" });
    } else if (
      order.orderStatus === "Processing" &&
      status === "Cancelled" &&
      (order.paymentMethod === "onlinePayment" ||
        order.paymentMethod === "Wallet")
    ) {
      const user = await UserModel.findById(order.userId);

     
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found." });
      }

      
      user.wallet.balance += order.totalPrice;
      await user.save();

      order.orderStatus = status;
    } else {
     
      return res.status(400).json({
        success: false,
        message: "Invalid combination of order status and status",
      });
    }

    
    const updatedOrder = await order.save();

   
    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order status updated",
    });
  } catch (error) {
    console.error("Error updating Order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.paymentverification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderDetails } =
      req.body;

    console.log(
      "body",
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected_signature = crypto
      .createHmac("sha256", "di489bhFwIvJ0YVnd487dJfH")
      .update(body.toString())
      .digest("hex");

    if (razorpay_signature === expected_signature) {
      await orderModel.updateOne(
        { razor_orderId: razorpay_order_id },
        {
          $set: {
            
            orderStatus : "Processing",
            paymentStatus: true,
            razor_paymentId: razorpay_payment_id,
            razor_signature: razorpay_signature,
          },
        }
      );

      const user = await orderModel.findOne(
        { razor_orderId: razorpay_order_id },
        { userId: 1 }
      );

      if(orderDetails.preOrderId){

        await orderModel.deleteOne({_id:orderDetails.preOrderId})

    
      }

      if (user) {
        await UserModel.updateOne({ _id: user.userId }, { $set: { cart: [] } });
        console.log("Cart emptied for user:", user.userId);
      } else {
        console.log("User not found for order:", razorpay_order_id);
      }

      return res.json({ success: true });
    } else {
      console.log("Signature validation failed");
      return res
        .status(400)
        .json({ success: false, message: "Signature validation failed" });
    }
  } catch (error) {
    console.error("Error in payment verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



exports.filterDataByDate = async (req, res) => {
  let { startDate, endDate } = req.body;

  console.log('startDate:', startDate ,'endDate:',endDate );
  

  if (startDate === endDate)
    endDate = new Date(new Date(endDate).setHours(28, 59, 59, 999));

  try {
    const orderData = await orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
    ]);

    console.log('orderData:', orderData);
    
    return res.status(200).json({ success: true, data: orderData });
  } catch (error) {
    console.log("error while getting order details", error);
    return res.json({
      success: false,
      message: "error while getting order filtering",
    });
  }
};



// exports.calculateMonthlyStats = async (req, res) => {
//   // Assuming orders are fetched from a database or another data source
//   // const orders = req.orders; // Orders fetched from somewhere, e.g., database
//   const orders = await orderModel.find({})
//   // Initialize the Order model with the orders data
//   // const orderModel = new orderModel(orders);

//   // Get current month and year
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth() + 1; // January is 0, so we add 1

//   // Calculate stats from January to current month
//   const monthlyStats = {};

//   orders.forEach(order => {
//     const orderDate = new Date(order.orderDate);
//     const orderMonth = orderDate.getMonth() + 1;
//     const orderYear = orderDate.getFullYear();
//     const monthYear = `${orderYear}-${orderMonth < 10 ? '0' + orderMonth : orderMonth}`;

//     if (!monthlyStats[monthYear]) {
//       monthlyStats[monthYear] = {
//         revenue: 0,
//         transactions: 0
//       };
//     }

//     // Check if order is delivered to count as revenue
//     if (order.orderStatus === 'Delivered') {
//       monthlyStats[monthYear].revenue += order.totalPrice;
//     }

//     // Count all orders as transactions
//     monthlyStats[monthYear].transactions++;
//   });

//   // Filter stats from January to the current month
//   const filteredMonthlyStats = {};
//   for (let year = 2024; year <= currentYear; year++) {
//     for (let month = 1; month <= (year === currentYear ? currentMonth : 12); month++) {
//       const monthKey = `${year}-${month < 10 ? '0' + month : month}`;
//       filteredMonthlyStats[monthKey] = monthlyStats[monthKey] || { revenue: 0, transactions: 0 };
//     }
//   }

//   console.log("hi")

//   // Send the monthly stats as JSON response
//   res.json({ monthlyStats: filteredMonthlyStats });
// };


// exports.calculateMonthlyStats = async (req, res) => {
//   try {
//     const orders = await orderModel.find(); // Assuming OrderModel is your Mongoose model for orders

//     const monthlyRevenue = new Array(12).fill(0);
//     const monthlyTransactions = new Array(12).fill(0);

//     orders.forEach(order => {
//       const createdAt = new Date(order.createdAt);
//       const month = createdAt.getMonth();
//       const totalPrice = order.totalPrice;

//       if (order.orderStatus === 'Delivered') {
//         monthlyRevenue[month] += totalPrice;
//       }

//       monthlyTransactions[month]++;
//     });

//     res.json({ monthlyRevenue, monthlyTransactions });
//   } catch (error) {
//     console.error('Error calculating monthly stats:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// exports.calculateMonthlyStats = async (req, res) => {
//   try {
//     const orders = await orderModel.find(); // Assuming OrderModel is your Mongoose model for orders

//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     const monthlyRevenue = new Array(currentMonth + 1).fill(0);
//     const monthlyTransactions = new Array(currentMonth + 1).fill(0);

//     orders.forEach(order => {
//       const createdAt = new Date(order.createdAt);
//       const orderMonth = createdAt.getMonth();
//       const orderYear = createdAt.getFullYear();
//       const totalPrice = order.totalPrice;

//       if (orderYear === currentYear && orderMonth <= currentMonth) {
//         if (order.orderStatus === 'Delivered') {
//           monthlyRevenue[orderMonth] += totalPrice;
//         }

//         monthlyTransactions[orderMonth]++;
//       }
//     });

//     res.json({ monthlyRevenue, monthlyTransactions });
//   } catch (error) {
//     console.error('Error calculating monthly stats:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




// exports.calculateMonthlyStats = async (req, res) => {
//   try {
//     const orders = await orderModel.find(); // Assuming OrderModel is your Mongoose model for orders

//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     const monthlyRevenue = new Array(currentMonth + 1).fill(0);
//     const monthlyTransactions = new Array(currentMonth + 1).fill(0);
//     let successfulOrders = 0;

//     orders.forEach(order => {
//       const createdAt = new Date(order.createdAt);
//       const orderMonth = createdAt.getMonth();
//       const orderYear = createdAt.getFullYear();
//       const totalPrice = order.totalPrice;

//       if (orderYear === currentYear && orderMonth <= currentMonth) {
//         if (order.orderStatus === 'Delivered') {
//           monthlyRevenue[orderMonth] += totalPrice;
//           successfulOrders++;
//         }

//         monthlyTransactions[orderMonth]++;
//       }
//     });

//     res.json({ monthlyRevenue, monthlyTransactions, successfulOrders });
//   } catch (error) {
//     console.error('Error calculating monthly stats:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


exports.calculateMonthlyStats = async (req, res) => {
  try {
    const orders = await orderModel.find(); // Assuming OrderModel is your Mongoose model for orders

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyRevenue = new Array(currentMonth + 1).fill(0);
    const noMonthlyTransactions = new Array(currentMonth + 1).fill(0);
    const noMonthlySuccessfulOrders = new Array(currentMonth + 1).fill(0);

    orders.forEach(order => {
      const createdAt = new Date(order.createdAt);
      const orderMonth = createdAt.getMonth();
      const orderYear = createdAt.getFullYear();
      const totalPrice = order.totalPrice;

      if (orderYear === currentYear && orderMonth <= currentMonth) {
        if (order.orderStatus === 'Delivered') {
          monthlyRevenue[orderMonth] += totalPrice;
          noMonthlySuccessfulOrders[orderMonth]++;
        }

        noMonthlyTransactions[orderMonth]++;
      }
    });

    res.json({ monthlyRevenue, noMonthlyTransactions, noMonthlySuccessfulOrders });
  } catch (error) {
    console.error('Error calculating monthly stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};