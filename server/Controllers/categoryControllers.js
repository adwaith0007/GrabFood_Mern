const categoryModel = require("../Models/Category");
const { upload } = require("../middlewares/multer");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

/* POST: http://localhost:5000/api/admin/category/add */

exports.addCategory = async (req, res) => {
  console.log("add category");

  try {
    upload.array("images")(req, res, async (err) => {
      console.log(req.body);

      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const image = req.files;
      const filenames = image.map((file) => file.filename);

      const { category } = req.body;
      console.log(category);

      if (!category) {
        return res.json({ success: false, message: "Enter the category name" });
      }

      // Check if the category already exists
      const categoryExist = await categoryModel.findOne({ category });

      if (categoryExist) {
        return res.json({ success: false, message: "Category already exists" });
      }

      const categoryDoc = new categoryModel({
        category,
        categoryImage: filenames,
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

exports.getcategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryDetails = await categoryModel.findById(categoryId);

    if (!categoryDetails) {
      return res
        .status(404)
        .json({ success: false, message: "category not found" });
    }

    res.status(200).json({ success: true, data: categoryDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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

exports.demo = async (req, res) => {
  console.log(req.file);
};



exports.updateCategory = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const categoryId = req.params.categoryId;

      console.log(req.body);

      console.log(categoryId);

      const { category } = req.body;
      const image = req.file?.filename;

      await categoryModel.findOneAndUpdate(
        { _id: categoryId },
        {
          $set: {
            category: category,
          },
        }
      );

      await categoryModel.updateOne(
        { _id: categoryId },
        { $push: { images: image } }
      );

      res.status(201).json({ success: true, message: "Category updated" });
    });
  } catch (error) {
    console.log("error while editing form", error);
  }
};




exports.deleteCategory= async (req,res)=>{

  const categoryId = req.params.categoryId;

  try {
    const category = await categoryModel.findOneAndDelete({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

   

    return res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}