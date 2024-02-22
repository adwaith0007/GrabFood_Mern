
const express = require("express");
const router = express.Router();
const UserModel = require("../Models/userModels");
const NewUser = require("../Models/user");

const userController = require("../Controllers/userControllers");

const {registerMail} = require ("../middlewares/mailer");
const { isUserLoggedIn, isAdminLoggedIn } = require("../middlewares/Auth");






router.post("/login",userController.verifyUser ,  userController.login);



router.post("/user/edit", isUserLoggedIn, (req, res) => {
  userController.edit(req, res);
});


router.get("/users/delete/:id", isAdminLoggedIn, (req, res) => {
  userController.delete(req, res);
});




// POST Methods 

router.post('/register', (req,res)=>{    /* register user ok */
    userController.register(req, res);
   
})

router.post('/user/new', (req,res)=>{    /* register user ok */
    userController.newUser(req, res);
   
})



router.post('/registerMail', registerMail) //send the email

router.post('/authenticate',userController.verifyUser,(req,res)=>{
    res.end()
})






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

// router.put('/updateuser' , userController.auth , userController.updateUser); // is use to update the user profile
router.put('/updateuser' ,  userController.updateUser); // is use to update the user profile
// router.put('/updateuser', (req,res)=>{  
     
     
// userController.updateUser(req, res);
   
// })
router.put('/resetPassword'  , userController.resetPassword); 




router.post("/user/getAddress", isUserLoggedIn, (req, res) => {
  userController.getAddress(req, res);
});


router.put('/updateAddresses/:userId'  , userController.addAddress); 









  router.post('/user/v1/new', async (req, res) => {
    
    const { name, email, photo, gender, _id, dob } = req.body;
    
    
    

      let user = await NewUser.findById(_id);
    

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

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
  }
);
   


router.get('/user/v1/:id', async (req, res,next) => {

  
    const id = req.params.id;
    const user = await NewUser.findById(id);
  
    if (!user) return next(new ErrorHandler("Invalid Id", 400));
  
    return res.status(200).json({
      success: true,
      user,
    });
  });
  






      





module.exports = router;