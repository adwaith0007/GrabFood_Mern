const express = require("express");
const router = express.Router();
const categoryControllers = require("../Controllers/categoryControllers");


// const  upload  = require("../middlewares/multer"); 




const  upload  = require("../middlewares/multer.js"); 

router.post('/upload', upload.single('file'), (req, res) => {
  const name = req.body.category;
  const file = req.file;

  console.log('Name:', name);
  console.log('File:', file);
  
  // if (!file || !name) {
  //     return res.status(400).json({ message: 'Name and file are required.' });
  // }

  console.log("h");
  
 
  res.status(200).json({ message: 'File uploaded successfully.' });
});



router.post("/add", upload.single('file'), (req, res) => {
  categoryControllers.addCategory(req, res);
});


// router.post("/add", (req, res) => {
//   categoryControllers.addCategory(req, res);
// });

router.get("/get", (req, res) => {
  categoryControllers.listCategory(req, res);
});

router.get("/get/admin", (req, res) => {
  categoryControllers.adminListCategory(req, res);
});

router.get("/:categoryId", categoryControllers.getcategoryDetails);

router.put("/update/:categoryId", (req, res) => {
  categoryControllers.updateCategory(req, res);
});

router.delete("/delete/:categoryId", (req, res) => {
  categoryControllers.softDeleteCategory(req, res);
});


module.exports = router;
