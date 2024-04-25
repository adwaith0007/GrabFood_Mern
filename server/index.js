const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const userRouter = require("./Routes/userRoutes.js");
const adminRouter = require("./Routes/adminRoutes.js");
const productRouter = require("./Routes/productRoutes.js");
const categoryRouter = require("./Routes/categoryRouter.js");
const couponRouter = require("./Routes/couponRouter.js");
const orderRouter = require("./Routes/orderRouter.js");
const cartRoutes = require("./Routes/cartRoutes.js");

// const Razorpay = require("razorpay")



require("dotenv").config();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const BuildPath = path.join(__dirname, "../client/dist");

// B:\vs\Project\GrabFood_Mern_2024\client\dist


const app = express();
const PORT = process.env.PORT;
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

app.use(express.static(BuildPath));
app.use(cors())
app.use(morgan("tiny"));

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());



// middleware

app.use(express.static("./uploads"));



// api routes
app.use("/api", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", cartRoutes);
app.use("/api", orderRouter);
app.use("/api/coupon", couponRouter);






// exports.instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });



app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/grabfoodmern")
  .then(() => {
    console.log("Db connection established");
  })
  .catch((err) => {
    console.log("connection error: " + err);
  });
