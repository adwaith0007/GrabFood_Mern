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

// module.exports = upload;


// Define storage for single image
const singleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/single'); // Set the destination for single image uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Define storage for multiple images
const multipleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/multiple'); // Set the destination for multiple image uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Set up Multer middleware with different storage for single and multiple images
const uploadSingle = multer({ storage: singleStorage }).single('file');
const uploadMultiple = multer({ storage: multipleStorage }).array('multipleImages', 3); // Change 3 to the maximum number of images allowed


module.exports = {uploadSingle,uploadMultiple,upload}