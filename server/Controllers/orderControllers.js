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

exports.placeOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      address,
      paymentMethod,
      orderDate,
      totalPrice,
      couponId,
    } = req.body;

    if (
      !userId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !address ||
      !paymentMethod ||
      !orderDate ||
      !totalPrice
    ) {
      return res.status(301).json({
        success: false,
        message: "Please provide valid information for the order.",
      });
    }

    const user = await UserModel.findById(userId);

    console.log(req.body);
    const newOrder = new orderModel({
      userId,
      userName: user.username,
      products,
      orderStatus,
      couponId,
      address,
      paymentMethod,
      orderDate,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to place order. Please try again later.",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming you want to retrieve orders for a specific user
    const userOrders = await orderModel.find({ userId });

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

    // console.log(order);

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

// exports.cancelOrder = async (req, res) => {

//   try {
//     const orderId = req.params.orderId;
//     const userId = req.body.userId;
//     console.log(orderId);
//     console.log('userId',userId);

//     const order = await orderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ success: false, error: "Order not found." });
//     }

//     // Update the order status to "Cancel"
//     const updatedOrder = await orderModel.findByIdAndUpdate(
//       orderId,
//       { $set: { orderStatus: "Cancel" } },
//       { new: true } // This option returns the modified document
//     );

//     res.status(200).json({
//       success: true,
//       message: "Order canceled successfully.",
//       updatedOrder: updatedOrder, // Send the updated order back in the response
//     });
//   } catch (error) {
//     console.error("Error canceling order:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to cancel order. Please try again later.",
//     });
//   }
// };

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

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: "Cancel" } },
      { new: true }
    );

    if (
      order.paymentMethod === "onlinePayment" &&
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

    res.status(200).json({
      success: true,
      message: "Order canceled successfully.",
      updatedOrder: updatedOrder,
    });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to cancel order. Please try again later.",
    });
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

exports.paymentverification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
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
