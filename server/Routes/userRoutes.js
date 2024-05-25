const express = require("express");
const router = express.Router();
const UserModel = require("../Models/userModels");
const NewUser = require("../Models/user");

const userController = require("../Controllers/userControllers");
const walletController = require("../Controllers/walletController");
const orderControllers = require("../Controllers/orderControllers");
const cartControllers = require("../Controllers/cartController");
const { registerMail } = require("../middlewares/mailer");
const { isUserLoggedIn, isAdminLoggedIn , verifyToken } = require("../middlewares/Auth");

const {validateQuantity} = require("../middlewares/Cart");
const { log } = require("handlebars");



router.post("/login",  (req, res) => {
  userController.login(req, res);
});

router.put("/user/edit/:userId", isUserLoggedIn, (req, res) => {
  userController.editUser(req, res);
});




router.post('/register', userController.register);



router.post("/user/wishlist/toggle_add",isUserLoggedIn,  (req, res) => {  

  
  userController.toggleWishlist(req, res);
});

router.post("/user/wishlist/add",isUserLoggedIn,  (req, res) => {  

  
  userController.addToWishlist(req, res);
});

router.get("/user/:userId/wishlist",isUserLoggedIn, (req, res) => {
  userController.getWishlist(req, res);
});


router.put("/wishlist/remove/:userId",isUserLoggedIn, (req, res) => {
  
  userController.removeFromWishlist(req, res);
});


router.put("/cart/add/wishlist/:userId",isUserLoggedIn, (req, res) => { 
  cartControllers.addToCartFromWishlist(req, res);
});


router.get("/users/delete/:id",isUserLoggedIn,  (req, res) => {
  userController.delete(req, res);
});




router.post("/user/new", (req, res) => {
  /* register user ok */
  userController.newUser(req, res);
});

router.post("/registerMail", registerMail); //send the email

router.post("/authenticate", userController.verifyUser,  (req, res) => {
  res.end();
});

router.post("/registerMail", (req, res) => {
  /* to send email  */
  res.json("registerMail");
});

router.post("/authenticate", (req, res) => {
  /* authenticate user  */
  res.json("authenticate user");
});

// GET Methods
router.get("/user/:username", userController.getUser); /* user login  */

router.get("/user/get/:userId",isUserLoggedIn, (req, res) => {

 
  
  
  userController.getUserById(req, res);
});

router.get("/generateOTP",userController.localVariables,userController.generateOTP); // generate random OTP

router.get("/verifyOTP", userController.verifyUser, userController.verifyOTP);

/* PUT Methods */


router.put("/updateuser",isUserLoggedIn, userController.updateUser); 

router.put("/resetPassword", userController.resetPassword);



router.post("/user/getAddress", isUserLoggedIn,  (req, res) => {
  
  
  userController.getAddress(req, res);
});

router.put("/addaddresses/:userId", isUserLoggedIn, userController.addAddress);








router.put("/user/:userId/addresses/:addressId", userController.updateAddress);

router.delete("/user/:userId/addresses/:addressId", userController.deleteAddress);




router.get('/user/:userId/addresses',   (req, res) => { 
  userController.getUserAddresses(req, res);
});


// wallet

router.get('/user/:userId/wallet', (req, res) => { 
  walletController.getBalance(req, res);
});


router.post("/wallet/deduct",  (req, res) => {
  walletController.getDeducted(req, res);
});


router.post("/order/wallet",  (req, res) => {
  console.log('order_wallet');
  
  orderControllers.orderforWallet(req, res);
});


router.post("/order/cod",  (req, res) => {
   orderControllers.orderCOD(req, res);
});


router.post("/user/v1/new", async (req, res, next) => {
  try {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await NewUser.findById(_id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    }

    if (!_id || !name || !email || !photo || !gender || !dob) {
      throw new Error("Please add all fields");
    }

    user = await NewUser.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  } catch (error) {
    // Handle the error here
    console.error(error.message);

    // Send a standardized error response
    return res.status(400).json({
      success: false,
      message: error.message,
    });

    // If you have a global error handler middleware, you can call next(error) instead of the above response
    // next(error);
  }
});



// for google login
router.get("/user/v1/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await NewUser.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null, // Optionally include null data or any additional information
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // Handle other types of errors
    console.error(error.message);

    // Send a standardized error response
    return res.status(400).json({
      success: false,
      message: "Invalid request",
      data: null,
    });
  }
});








module.exports = router;
