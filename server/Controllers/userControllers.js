const UserModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator= require('otp-generator');
const cookieParser = require("cookie-parser");





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

/* POST: http://localhost:5000/api/login */
exports.login = async (req, res) => {
  const { username , password } = req.body;

  try {
   const user = await UserModel.findOne({ username });

   console.log(user.username);
   

     //check user
  if (!user){
    res.json({ success: false, message: "user not found" });
    
  } 

  //check whether blocked
  if (user.isBlocked)
    return res.json({ success: false, message: "user is blocked" });

    if (await bcrypt.compare(password, user.password)) { 

       // create jwt token
       const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        "secretkey",
        { expiresIn: "24h" }
      );

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

/* Middleware */
exports.verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
    console.log('verifyUser ok');
    
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




exports.login2 = async (req, res) => {
  const { email, password } = req.body;

  //check if the input field is empty
  if (!email || !password) {
    return res.json({ message: "enter username and password" });
  }

  //get user
  const user = await UserModel.findOne(
    { email: email },
    { _id: 1, hashedPassword: 1, isBlocked: 1 }
  );

  //check user
  if (!user) res.json({ success: false, message: "user not found" });

  //check whether blocked
  if (user.isBlocked)
    return res.json({ success: false, message: "user is blocked" });

  console.log(user);

  try {
    if (await bcrypt.compare(password, user.hashedPassword)) {
      //generate token
      const token = CreateToken(user._id.toString());
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({ success: true, message: "login successful", token: token });
    } else return res.json({ success: false, message: "login failed" });
  } catch (error) {
    console.log("error with bcrypt compare");
  }
};


exports.signUp = async (req, res) => {
  /* not working */
  try {
    const { fname, lname, email, password, phone } = req.body;

    console.log("start");

    /* check the existing email */
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, existingEmail) {
        console.log("1");
        if (err) {
          reject(new Error(err));
        } else if (existingEmail) {
          reject({ error: "Email id already exists" });
        } else {
          console.log("ok");
          resolve();
        }
      });
    });

    /* check the existing phone */
    const existPhone = new Promise((resolve, reject) => {
      UserModel.findOne({ phone }, function (err, existingPhone) {
        if (err) {
          reject(new Error(err));
        } else if (existingPhone) {
          reject({ error: "Phone number already exists" });
        } else {
          console.log("2ok");
          resolve();
        }
      });
    });

    return Promise.all([existEmail, existPhone])
      .then(() => {
        if (password) {
          console.log("password");
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              console.log("hash done");

              const user = new UserModel({
                email,
                password: hashedPassword,
                fname,
                lname,
                phone,
              });

              /* return save result as a response */
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Unable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// exports.verifyLogin_post = async (req, res) => {
//   const { email, password } = req.body;

// try{

//   const userData = await UserModel.findOne({email:email});

//   if(userData){

//     const passwordMatch = await bcrypt.compare(password,userData.hashedPassword);

//     if(passwordMatch){
//       const token = createToken(userData._id);
//         res.cookie('jwt', token,{ httpOnly: true, maxAge: maxAge * 1000 });
//            res.json({ success: true, message: 'Login successful' });
//         console.log('good');
//     }else{
//         console.log('sorry');
//         res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//   }else{
//     res.status(404).json({ success: false, message: 'User not found' });
//     console.log('somthing went wrong');
//   }

// } catch (error) {
//         console.error("Error during login:", error.message);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }

// };

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



//auth midddleware



