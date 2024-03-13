const categoryModel = require("../Models/Category");
const upload = require("../middlewares/multer");            
// const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

// exports.addCategory = async (req, res) => {
//   console.log("add category");

//   try {
//     upload.array("images")(req, res, async (err) => {
//       console.log(req.body);

//       if (err) {
//         return res.json({ success: false, message: err.message });
//       }

//       if (!req.files || req.files.length === 0) {
//         return res.json({ success: false, message: "No images uploaded" });
//       }

//       const image = req.files;
//       const filenames = image.map((file) => file.filename);

//       const { category } = req.body;
//       console.log(category);

//       if (!category) {
//         return res.json({ success: false, message: "Enter the category name" });
//       }

//       const categoryExist = await categoryModel.findOne({
//         category: { $regex: new RegExp(`^${category}$`, 'i') },
//       });

//       if (categoryExist) {
//         return res.json({ success: false, message: "Category already exists" });
//       }

//       const categoryDoc = new categoryModel({
//         category,
//         categoryImage: filenames,
//       });

//       await categoryDoc.save();

//       res
//         .status(201)
//         .json({ success: true, message: "Category added successfully" });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.addCategory = async (req, res) => {
  try {
    // upload.single("file")(req, res, async (err) => {
    //   if (err) {
    //     return res.json({ success: false, message: err.message });
    //   }

      const name = req.body.category;
      // const file = req.file;

      console.log('in');
      

      console.log("Name:", name);
      // console.log("File:", file);

      const { category } = req.body;

      if (!category) {
        return res.json({ success: false, message: "Enter the category name" });
      }

      const categoryExist = await categoryModel.findOne({
        category: { $regex: new RegExp(`^${category}$`, "i") },
      });

      if (categoryExist) {
        return res.json({ success: false, message: "Category already exists" });
      }

      const image = req.file;

      console.log("File:", image);

      if (!image) {
        return res.json({ success: false, message: "No image uploaded" });
      }

      const categoryDoc = new categoryModel({
        category,
        categoryImage: image.originalname,
      });

      await categoryDoc.save();

      res
        .status(201)
        .json({ success: true, message: "Category added successfully" });
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.adminListCategory = async (req, res) => {
  try {
    const data = await categoryModel.find({});

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.listCategory = async (req, res) => {
  try {
    const data = await categoryModel.find({ deleted: false });
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

// exports.updateCategory = async (req, res) => {
//   try {
//     upload.single("photo")(req, res, async (err) => {
//       if (err) {
//         return res.json({ success: false, message: err.message });
//       }

//       const categoryId = req.params.categoryId;

//       console.log(req.body);

//       console.log(categoryId);

//       const { category } = req.body;
//       const image = req.file?.filename;

//       await categoryModel.findOneAndUpdate(
//         { _id: categoryId },
//         {
//           $set: {
//             category: category,
//           },
//         }
//       );

//       await categoryModel.updateOne(
//         { _id: categoryId },
//         { $push: { images: image } }
//       );

//       res.status(201).json({ success: true, message: "Category updated" });
//     });
//   } catch (error) {
//     console.log("error while editing form", error);
//   }
// };

exports.updateCategory = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error in file upload",
        });
      }

      const categoryId = req.params.categoryId;

      const { category } = req.body;

      let categoryToUpdate = await categoryModel.findById(categoryId);

      if (!categoryToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      categoryToUpdate.category = category;

      console.log(req);

      if (req.file) {
        categoryToUpdate.categoryImage = [req.file.filename];
      }

      const updatedCategory = await categoryToUpdate.save();

      res.status(200).json({ success: true, data: updatedCategory });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    upload.array("images")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error in file upload",
        });
      }
      const productId = req.params.productId;

      const { desc, price, category, name } = req.body;
      const newImages = req.files?.map((file) => file.filename) || [];

      const existingProduct = await productModel.findById(productId);

      const updatedImages = existingProduct.productImage.concat(newImages);

      const updatedProduct = {
        _id: productId,
        productName: name,
        productImage: updatedImages,
        price: Number(price),
        Description: desc,
        category: category,
      };

      await productModel.findByIdAndUpdate(productId, { $set: updatedProduct });

      res
        .status(201)
        .json({
          success: true,
          message: "Product updated",
          data: { updatedProduct },
        });
    });
  } catch (error) {
    console.log("Error while updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await categoryModel.findOneAndDelete({ _id: categoryId });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.softDeleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { deleted: true },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error soft deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
