const UserModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator= require('otp-generator');

const upload = require("../middlewares/multer");

const productModel = require("../Models/product");

/* POST: http://localhost:5000/api/login */
exports.login = async (req, res) => {
  const { username , password } = req.body;


  if (!username || !password) {
    return res.json({ success: false, message: "enter username and password" });
  }

  try {
   const user = await UserModel.findOne({ username });

   console.log(user.username);
   

     //check user
  if (!user){
    res.json({ success: false, message: "user not found" });
    
  } 

  if (user.isDeleted)
    return res.json({ success: false, message: "User deleted" });


  //check whether blocked
  if (user.isBlocked)
    return res.json({ success: false, message: "user is blocked" });


    if (await bcrypt.compare(password, user.password)) { 

       // create jwt token
       const token = jwt.sign(
        {
          _id: user._id,
          name: user.username,
          email: user.email,
          photo:"ineedtofix",
          role:"user",
          gender:"male",

        },
        "secretkey",
        { expiresIn: "24h" }
      );

      res.cookie('token', token);

      // res.cookie(String(user._id),token,{
      //   path:'/',
      //   expires: new Date(Date.now()+ 1000 * 30),
      //   httpOnly:true,
      //   sameSite:'lax'
      // })



      

      return res.status(200).send({
        msg: "Login Successful...!",
        username: user.username,
        token,
      });


    } else{

      return res.status(400).send({ error: "Password does not Match" });
    }
    
  } catch (error) {
    return res.status(500).send({ error });
  }
};


























/* POST: http://localhost:5000/api/register */
exports.register = async (req, res) => {
  const {  username, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
     
      username,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    console.log("New user registered:", newUser);

    res.json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error while Registration:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.verify = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "no token found" });

  try {
    const JwtUser = jwt.verify(token, "jwt_secret_key");
    const user = await UserModel.findOne({ _id: JwtUser.id });
    if (!user)
      return res.json({ success: false, message: "user not Authorized" });
    return res.json({ success: true, message: "user authorized" });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
  }
};


exports.getOneUser = async (req, res) => {
  const user = req?.user;

  console.log(user);

  try {
    const userDetails = await UserModel.find({ _id: user.id });
    res.json({ success: true, message: "got user details", user: userDetails });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
    else {
      console.log(error);
    }
  }
};









/* Middleware */
exports.verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
    console.log('User verifed');
    
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};



/* GET: http://localhost:5000/api/user/example123 */

exports.getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(501).send({ error: "Invalid Username" });
    } else {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(501).send({ error: "Couldn't Find the User" });
      } else {
        const { password, ...rest } = Object.assign({}, user.toJSON());

        return res.status(201).send(rest);
      }
    }
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    if (!userId) {
      return res.status(400).send({ error: "Invalid userId" });
    } else {
      const user = await UserModel.findById(userId);

      console.log('user:', user);

      if (!user) {
        return res.status(404).send({ error: "Couldn't find the user" });
      } 
      res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error in file upload",
        });
      }

      const categoryId = req.params.categoryId;

      const { category } = req.body;

      let categoryToUpdate = await categoryModel.findById(categoryId);

      if (!categoryToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      categoryToUpdate.category = category;

      console.log(req);

      if (req.file) {
        categoryToUpdate.categoryImage = [req.file.filename];
      }

      const updatedCategory = await categoryToUpdate.save();

      res.status(200).json({ success: true, data: updatedCategory });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.editUser = async (req, res) => {
  try {
    upload.single("profileImage")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error in file upload",
        });
      }

      const { userId } = req.params;
      const { name, email, phoneNumber } = req.body;

      console.log("body:", req.body);

      // Find user by ID
      let userToUpdate = await UserModel.findById(userId);

      if (!userToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      
      // Set profile picture if file uploaded
      let newProfile = userToUpdate.profilePicture;
      if (req.file) {
        newProfile = req.file.filename;
      }

      // Update user data
      userToUpdate.username = name;
      userToUpdate.email = email;
      userToUpdate.phone = phoneNumber;
      userToUpdate.profilePicture = newProfile;

      // Save updated user
      const updatedUser = await userToUpdate.save();

      res.status(200).json({ success: true, data: updatedUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.auth = async (req,res,next)=>{

  try {

      //access authorize header to validate request
     const token = req.headers.authorization.split(" ")[1];

    //  retrive the user details of the logged in user
   const decodeedToken = await jwt.verify(token, 'secretkey');
   req.user = decodeedToken;
   
   
   next();

      
  } catch (error) {

      res.status(401).json({error:"Authentication Failed"})
      return;
  }

  // res.json({ message: "Authentication successful", user: req.user });

  // console.log(req.user);
  
}


exports.localVariables = async (req,res,next)=>{
  req.app.locals = {
   OTP :null,
   resetSession : false
  }
  next()
 }



exports.updateUser = async (req,res)=>{
  try {
    
    
    const userId = req.query.id;
    console.log(userId);
   
    
    if(userId){
      const body = req.body;
      console.log(body);
      const result = await UserModel.updateOne({ _id: userId }, body);

      console.log(result);
      

      if (result.modifiedCount > 0) {
        return res.status(200).send({ msg: "Record Updated...!" });
      } else {
        return res.status(404).send({ error: "User Not Found or No Changes Made...!" });
      }
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};




/* GET:http://localhost:5000/api/generateOTP */
exports.generateOTP = async (req,res) => {

 req.app.locals.OTP = await  otpGenerator.generate(6, { lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
 res.status(201).send({code:req.app.locals.OTP})
}

/* GET:http://localhost:5000/api/verifyOTP */
exports.verifyOTP= async (req,res) => {
  const { code } = req.query;
  console.log(code);
  
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true ; // start session for reset password
    return res.status(201).send({msg: 'Verify Successfully!'})
  }

  return res.status(400).send({error: "Invalid OTP" })
}

//successfully redirect user when OTP is valid 
/* GET: http://localhost:5000/api/createResetSession */
exports.createResetSession = async (req,res) =>{
  if(req.app.locals.resetSession){
    req.app.locals.resetSession=false; // allow access to this route only once
    return res.status(201).send({msg:"access granted"})
  }
  return res.status(440).send({error:"Session expired!"})
}

//update the password when we have valid session
/* PUT:http://localhost:5000/api/resetPassword */
exports.resetPassword= async (req, res) => {
  try {
    // if (!req.app.locals.resetSession) {
    //   return res.status(440).send({ error: "Session expired!" });
    // }

    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );

      req.app.locals.resetSession = false; // reset session

      return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      return res.status(500).send({ error: "Failed to update password" });
    }
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
}











exports.verifyLogin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await UserModel.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(
        password,
        userData.hashedPassword
      );

      if (passwordMatch) {
        const token = createToken(userData._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        // document.cookie('hi')
        res.json({ success: true, message: "Login successful" });
        console.log(token);
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
        console.log("not good");
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






exports.toggleWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    
    let user = await UserModel.findById(userId);

    let product = await productModel.findById(productId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    
    const existingProductIndex = user.wishlist.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
      
      user.wishlist.splice(existingProductIndex, 1);
      await user.save();
      return res.status(200).json({ success: true, message: "Product removed from the wishlist" });
    } else {
     
      const newWishlistItem = {
        productId: productId,
        productName: product.productName,
        productImage: product.productImage[0],
        price: product.discountPrice ? product.discountPrice : product.price
      };
      user.wishlist.push(newWishlistItem);
      await user.save();
      return res.status(200).json({ success: true, message: "Product added to the wishlist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

 

  try {
    // Find user by ID
    const user = await UserModel.findById(userId);



    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get array of productId from user's wishlist
    // const productIds = user.wishlist.map(item => item.productId);

    // // Fetch product data for each productId
    // const productsData = await Promise.all(productIds.map(async (productId) => {
    //   const product = await productModel.findById(productId);
      
    //   return product;
    // }));

    // console.log(productsData);
    console.log(user.wishlist);
    // Return the product data
    // res.status(200).json({ success: true, data: productsData });
    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { selectedProductId } = req.body;

    const productId = selectedProductId
    
    console.log('Removing product from wishlist. UserId:', userId, 'ProductId:', productId);

    const user = await UserModel.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the index of the product with the matching productId
    const indexToRemove = user.wishlist.findIndex(product => product.productId === productId);

    console.log(indexToRemove);
    

    if (indexToRemove === -1) {
      console.log("Product not found in wishlist");
      return res.status(404).json({ success: false, message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist array
    user.wishlist.splice(indexToRemove, 1);

    await user.save();

    console.log("Product removed from wishlist");

    // Return the updated wishlist
    return res.status(200).json({ success: true, message: "Product removed from wishlist", data: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




exports.addAddress = async (req, res) => {
  const { userId, address } = req.body;

  try {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $push: { addresses: { $each: [address], $position: 0 } } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ success: true, message: "Address Updated" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found or no changes" });
    }
  } catch (error) {
    console.error("Error while adding address", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


exports.updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { address } = req.body;

  try {
    const result = await UserModel.updateOne(
      { _id: userId, "addresses._id": addressId },
      {
        $set: {
          "addresses.$.street": address.street,
          "addresses.$.city": address.city,
          "addresses.$.state": address.state,
          "addresses.$.zipCode": address.zipCode,
        },
      }
    );

    if (result.modifiedCount > 0) {
      return res.json({ success: true, message: "Address Updated" });
    } else {
      return res.status(404).json({
        success: false,
        message: "User or address not found, or no changes made.",
      });
    }
  } catch (error) {
    console.error("Error while updating address", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ success: true, message: "Address Deleted" });
    } else {
      return res.status(404).json({
        success: false,
        message: "User or address not found, or no changes made.",
      });
    }
  } catch (error) {
    console.error("Error while deleting address", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






exports.getAddress = async (req, res) => {
  const { userId } = req.body;
  try {
    let address = await UserModel.find({ _id: userId }, { addresses: 1 });
    address = address[0].addresses;
    return res.json({
      success: true,
      message: "successfully found address",
      address: address,
    });
  } catch (error) {
    console.log("error while getting address", error);
    return res.json({ success: false, message: "error while getting address" });
  }
};



exports.getAllAddress = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.SECRET_KEY);

  try {
    const data = await UserModel.find(
      { _id: user.id },
      { addresses: 1, _id: 0 }
    );
    const addresses = data[0].addresses;
    return res.json({ success: true, data: addresses });
  } catch (error) {
    console.log("error while getting all addresses", error);
    return res.json({
      success: false,
      message: "error while getting all addresses",
    });
  }
};


exports.getUserAddresses = async (req, res) => {

  
  
  const userId = req.params.userId;

  console.log(userId);
  

  try {
    const user = await UserModel.findById(userId);

   
    
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming that user addresses are stored in a property called addresses
    const addresses = user.addresses;

    console.log(addresses);

    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





exports.logout = async (req, res) => {
  return res.cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logged out" });
};