const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });





const singleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const multipleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/multiple'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Set up Multer middleware with different storage for single and multiple images
const uploadSingle = multer({ storage: singleStorage }).single('file');
const uploadMultiple = multer({ storage: multipleStorage }).array('multipleImages', 3); 


module.exports = {uploadSingle,uploadMultiple,upload}