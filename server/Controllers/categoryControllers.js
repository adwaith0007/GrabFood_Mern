const categoryModel = require ("../Models/foodCategory");
const upload = require("../middlewares/multer");


/* POST: http://localhost:5000/api/admin/category/add */

  exports.addCategory = async (req, res) => {
    try {
      upload.array("file")(req, res, async (err) => {
        
        if (err) {
          return res.json({ success: false, message: err.message });
        }
        const image = req.files;
        
        const {  category } = req.body;
        if (  !category) {
          return res.json({ success: false, message: "Enter the category name" });
        }
  
        const categoryDoc = new categoryModel({
          category,
          
          categoryImage: image,
        });
        await categoryDoc.save();
  
        res
          .status(201)
          .json({ success: true, message: "Category added successfully" });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };



  
  exports.listCategory = async (req, res) => {
    try {
      const data = await categoryModel.find({});
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  exports.delete = async (req, res) => {
    const { category } = req.body;
  
    try {
      await categoryModel.findOneAndDelete({ _id: category._id });
      return res
        .status(200)
        .json({ success: true, message: "Category deleted " });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while deleting category - backend",
      });
    }
  };


  exports.demo = async (req,res)=>{
    
    
    console.log(req.file);
    
  }