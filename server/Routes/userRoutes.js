
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

const {registerMail} = require ("../middlewares/mailer")

// const { check, validationResult } = require('express-validator');





// POST Methods 

router.post('/register', (req,res)=>{    /* register user ok */
    userController.register(req, res);
   
})

// router.post('/register', userController.register)

router.post('/registerMail', registerMail) //send the email

router.post('/authenticate',userController.verifyUser,(req,res)=>{
    res.end()
})

router.post('/signup', (req,res)=>{    /* register user demo */
    userController.signUp(req, res);
   
})

router.post("/login",userController.verifyUser ,  userController.login);/* user login ok */



router.post('/registerMail', (req,res)=>{   /* to send email  */
    res.json('registerMail')
   
})

router.post('/authenticate', (req,res)=>{   /* authenticate user  */
    res.json('authenticate user')
   
})




// GET Methods


router.get('/user/:username',  userController.getUser);/* user login  */
router.get('/generateOTP', userController.localVariables , userController.generateOTP); // generate random OTP
router.get('/verifyOTP',userController.verifyUser,userController.verifyOTP)

/* PUT Methods */

router.put('/updateuser' , userController.auth , userController.updateUser); // is use to update the user profile

router.put('/resetPassword'  , userController.resetPassword); 




module.exports = router;