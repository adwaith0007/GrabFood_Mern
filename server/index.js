const express = require('express');
const mongoose = require ("mongoose");
const cors = require("cors");
const userRouter = require("./Routes/userRoutes.js")
const adminRouter = require("./Routes/adminRoutes.js")
require("dotenv").config();


const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
// const { check ,validationResult } = require('express-validator')
// const { body, validationResult } = require('express-validator');



const app = express();
const PORT = process.env.PORT


app.use(cors());
app.use(morgan('tiny'));


app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit based on your needs
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use('/',express.static("uploads"));
// app.use(express.static("./uploads"));


// middleware
app.disable('x-powered-by');
app.use(express.static("./uploads"));

// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
  
// );


// api routes
app.use("/api",userRouter)
app.use("/api/admin",adminRouter)

// HTTP GET Request
app.get('/',(req,res)=>{
  res.status(201).json(`Home GET Request  `)
})



app.listen(PORT,()=>{
    console.log(`Express app listening on port ${PORT}`)
})

mongoose.connect("mongodb://127.0.0.1:27017/grabfoodmern")
.then(() => {
    console.log("Db connection established");
  })
  .catch((err) => {
    console.log("connection error: " + err);
  });





 























