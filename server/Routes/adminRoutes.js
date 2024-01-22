const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminControllers");
const categoryControllers = require("../Controllers/categoryControllers");
const itemControllers = require("../Controllers/itemControllers");
const upload = require("../middlewares/multer");


// POST Methods

router.post("/register", (req, res) => {
  adminController.adminRegister(req, res);
});

router.post("/login", (req, res) => {
  adminController.adminLogin(req, res);
});

router.post("/category/add", (req, res) => {
  categoryControllers.addCategory(req, res);
});



router.post("/items/add", (req, res) => {
  itemControllers.addItems(req, res);
});

router.post("/items/get", (req, res) => {
  itemControllers.getItems(req, res);
});

router.get("/category", (req, res) => {
  itemControllers.listCategory(req, res);
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
