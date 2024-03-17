const express = require("express");
const router = express.Router();
const UserModel = require("../Models/userModels");
const NewUser = require("../Models/user");

const userController = require("../Controllers/userControllers");
const cartController = require("../Controllers/cartController");

const { registerMail } = require("../middlewares/mailer");
const { isUserLoggedIn, isAdminLoggedIn } = require("../middlewares/Auth");

const {validateQuantity} = require("../middlewares/Cart");



router.post("/login",  (req, res) => {
  userController.login(req, res);
});

router.post("/user/edit", isUserLoggedIn, (req, res) => {
  userController.edit(req, res);
});


router.post("/register", (req, res) => {
  userController.register(req, res);
});




router.get("/users/delete/:id", isAdminLoggedIn, (req, res) => {
  userController.delete(req, res);
});




router.post("/user/new", (req, res) => {
  /* register user ok */
  userController.newUser(req, res);
});

router.post("/registerMail", registerMail); //send the email

router.post("/authenticate", userController.verifyUser, (req, res) => {
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

router.get(
  "/generateOTP",
  userController.localVariables,
  userController.generateOTP
); // generate random OTP
router.get("/verifyOTP", userController.verifyUser, userController.verifyOTP);

/* PUT Methods */

// router.put('/updateuser' , userController.auth , userController.updateUser); // is use to update the user profile
router.put("/updateuser", userController.updateUser); // is use to update the user profile
// router.put('/updateuser', (req,res)=>{

// userController.updateUser(req, res);

// })
router.put("/resetPassword", userController.resetPassword);

// router.post("/user/getAddress", isUserLoggedIn, (req, res) => {
//   userController.getAddress(req, res);
// });

router.post("/user/getAddress", isUserLoggedIn,  (req, res) => {
  
  
  userController.getAddress(req, res);
});

router.put("/addaddresses/:userId", userController.addAddress);








router.put("/user/:userId/addresses/:addressId", userController.updateAddress);

router.delete("/user/:userId/addresses/:addressId", userController.deleteAddress);




router.get('/user/:userId/addresses', (req, res) => { 
  userController.getUserAddresses(req, res);
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
