const itemModel = require("../Models/foodItems");
const categoryModel = require("../Models/foodCategory");
const upload = require("../middlewares/multer");

exports.addItems = async (req, res) => {

  try {
    
    
    upload.array("files")(req, res, async (err) => {
        console.log(req.body);
        
      if (err) {
        return res.json({ success: false, message: err.message });
      }
      
      const images = req.files;
      const itemImages = images.map((file) => file.originalname);
      const { name, description, category, price } = req.body;
      console.log(`name:${name}, dec:${description}, `);
      if (!name || !description || !price || !category || !itemImages) {
        console.log('hi');
        return res.json({ success: false, message: "fill all fields" });
      }

      const itemDoc = new itemModel({
        itemName: name,

        itemDesc: description,

        itemPrice: price,
        itemCategory: category,
        itemImages: itemImages,
      });
      await itemDoc.save();

      res
        .status(201)
        .json({ success: true, message: "Product added successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getItems = async (req, res) => {
  
}




exports.listCategory = async (req, res) => {
  try {
    const data = await categoryModel.find({}, { category: 1, categoryImage: 1, _id: 0 });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
