const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminControllers");
const { isUserLoggedIn, isAdminLoggedIn , verifyToken } = require("../middlewares/Auth");
// const categoryControllers = require("../Controllers/categoryControllers");

// const productControllers = require("../Controllers/productControllers");
const upload = require("../middlewares/multer");




router.post("/register", (req, res) => {
  adminController.adminRegister(req, res);
});

router.post("/login", (req, res) => {
  adminController.adminLogin(req, res);
});


router.get("/customers",isAdminLoggedIn, (req, res) => {
  adminController.getCustomers(req, res);
});


router.put("/customers",isAdminLoggedIn, (req, res) => {
  adminController.updateUserBlock(req, res);
});


// router.post("/demo", (req, res) => {
//   // categoryControllers.demo(req, res);

//   upload.array("file")(req, res, async (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(req.file);
//     console.log(req.body);
//   });
// });



module.exports = router;
