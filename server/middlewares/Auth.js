const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModels");
const adminModel = require("../Models/admin");

exports.isUserLoggedIn = async (req, res, next) => {
  console.log('Cookies:', req.cookies);
  const token = req.cookies.token;

  console.log('token:', token );

  try {
    if (!token)
      return req.json({ success: false, message: "user not Authenticated" });

    const jwtUser = jwt.verify(token, process.env.SECRET_KEY);
    const userExist = await UserModel.findOne({ _id: jwtUser.userId });

    if (!userExist)
      return res.json({ success: false, message: "user not found" });

      if (userExist.isBlocked) {
        // Redirect to login page if user is blocked
        return res.redirect('/login'); // Replace '/login' with the actual URL of your login page
      }

    req.user = userExist;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({ success: false, message: "token expired" });
    else return res.status(404);
  }
};

exports.isAdminLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "user not Authenticateddddd" });

    const jwtUser = jwt.verify(token, process.env.SECRET_KEY);
    const userExist = await adminModel.findOne({ _id: jwtUser.id });

    if (!userExist)
      return res.json({ success: false, message: "user not found" });
    else {
      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({ success: false, message: "token expired" });
    else return res.status(404);
  }
};