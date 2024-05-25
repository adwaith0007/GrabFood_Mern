const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModels");
const adminModel = require("../Models/admin");


// exports.isUserLoggedIn = async (req, res, next) => {
  
//   const tokenRegex = /token=([^;]+)/;
  
//   console.log('Cookies:', req.headers.cookie.match(tokenRegex));

//   const token = req.headers.cookie.match(tokenRegex);

//   console.log('token:', token );

//   try {
//     if (!token)
//       return req.json({ success: false, message: "user not Authenticated" });

//     const jwtUser = jwt.verify(token, process.env.SECRET_KEY);
//     const userExist = await UserModel.findOne({ _id: jwtUser.userId });

//     if (!userExist)
//       return res.json({ success: false, message: "user not found" });

//       if (userExist.isBlocked) {
//         // Redirect to login page if user is blocked
//         return res.redirect('/login'); // Replace '/login' with the actual URL of your login page
//       }

//     req.user = userExist;
//     return next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError")
//       return res.json({ success: false, message: "token expired" });
//     else return res.status(404);
//   }
// };

// exports.isAdminLoggedIn = async (req, res, next) => {
//   const token = req.cookies.token;

//   try {
//     if (!token)
//       return res
//         .status(401)
//         .json({ success: false, message: "user not Authenticateddddd" });

//     const jwtUser = jwt.verify(token, process.env.SECRET_KEY);
//     const userExist = await adminModel.findOne({ _id: jwtUser.id });

//     if (!userExist)
//       return res.json({ success: false, message: "user not found" });
//     else {
//       next();
//     }
//   } catch (error) {
//     if (error.name === "TokenExpiredError")
//       return res.json({ success: false, message: "token expired" });
//     else return res.status(404);
//   }
// };





exports.isUserLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];

  

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(402).send({ auth: false, message: 'Invalid token format.' });
  }

  const tokenValue = token.split(' ')[1];

  console.log(tokenValue);

  try {
    const jwtUser = jwt.verify(tokenValue, "secretkey");

    const userExist = await UserModel.findOne({ _id: jwtUser._id });

    if(userExist.isBlocked!== true){

      
      console.log("token:", jwtUser);
      
      req.userId = jwtUser._id;
      // req.userRole = jwtUser.role;
      
    
      next();
    } else {
      return res.status(401).send({ auth: false, message: 'User is blocked' }); // Send appropriate response for blocked user
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ auth: false, message: 'Token expired.' });
    }
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
};



exports.isAdminLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];

  console.log(token);

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).send({ auth: false, message: 'Invalid token format.' });
  }

  const tokenValue = token.split(' ')[1];

  console.log(tokenValue);

  try {
    const jwtUser = jwt.verify(tokenValue, "secretkey");

    // const userExist = await UserModel.findOne({ _id: jwtUser._id });

    if(jwtUser.role=="admin"){

      
      console.log("token:", jwtUser);
      
      req.userId = jwtUser._id;
      // req.userRole = jwtUser.role;
      
    
      next();
    } else {
      return res.status(401).send({ auth: false, message: 'User is blocked.' }); // Send appropriate response for blocked user
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ auth: false, message: 'Token expired.' });
    }
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
};