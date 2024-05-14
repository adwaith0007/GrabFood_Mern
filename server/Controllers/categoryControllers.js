const categoryModel = require("../Models/Category");
const upload = require("../middlewares/multer");
const productModel = require("../Models/product");

// exports.addCategory = async (req, res) => {
//   try {
//     // Use async/await for file upload handling
//     await new Promise((resolve, reject) => {
//       upload.single("file")(req, res, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });

//     const { category } = req.body;

//     if (!category) {
//       return res.status(400).json({ success: false, message: "Enter the category name" });
//     }

//     const categoryExist = await categoryModel.findOne({
//       category: { $regex: new RegExp(`^${category}$`, "i") },
//     });

//     console.log('C_exist:', categoryExist);

//     if (categoryExist) {
//       return res.status(400).json({ success: false, message: "Category already exists" });
//     }

//     const image = req.file;

//     if (!image) {
//       return res.status(400).json({ success: false, message: "No image uploaded" });
//     }

//     const categoryDoc = new categoryModel({
//       category,
//       categoryImage: image.originalname,
//     });

//     await categoryDoc.save();

//     res.status(201).json({ success: true, message: "Category added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.addCategory = async (req, res) => {
  try {
    // Use async/await for file upload handling
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    let { category } = req.body;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Enter the category name backend" });
    }

    category = category.trim().toUpperCase();

    if (category.length < 3) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Category should be at least 3 characters long",
        });
    }

    const categoryLettersRegex = /^[A-Z ]+$/;
    if (!categoryLettersRegex.test(category)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Category should contain only letters and spaces",
        });
    }

    const categoryStartsWithLetterRegex = /^[A-Z]/;
    if (!categoryStartsWithLetterRegex.test(category)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Category should start with a letter",
        });
    }

    const categoryExist = await categoryModel.findOne({
      category: { $regex: new RegExp(`^${category}$`, "i") },
      
    });

   

    if (categoryExist) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const image = req.file;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const categoryDoc = new categoryModel({
      category,
      categoryImage: image.originalname,
      createdAt:new Date ()
    });

    await categoryDoc.save();
    console.log('worked')
    res
      .status(201)
      .json({ success: true, message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.adminListCategory = async (req, res) => {
  try {
    const data = await categoryModel.find({}).sort({ createdAt: -1 }); 

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

      console.log("Updating category...");

      const categoryId = req.params.categoryId;
      let { category , offer } = req.body;

      if (!category) {
        console.error("Category name is missing");
        return res
          .status(400)
          .json({ success: false, message: "Category name is required" });
      }

      category = category.trim().toUpperCase();

      console.log("Received category name:", category);

      if (category.length < 3) {
        console.error("Category name is too short");
        return res
          .status(400)
          .json({
            success: false,
            message: "Category should be at least 3 characters long",
          });
      }

      
      const similarCategory = await categoryModel.findOne({
        category: { $regex: new RegExp(`^${category}$`, "i") },
        _id: { $ne: categoryId }
      });

      if (similarCategory) {
        console.error("A similar category already exists:", similarCategory);
        return res
          .status(400)
          .json({
            success: false,
            message: "A similar category already exists",
          });
      }

      let categoryToUpdate = await categoryModel.findById(categoryId);

      if (!categoryToUpdate) {
        console.error("Category not found");
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      categoryToUpdate.category = category;

      if (offer !== undefined) {
       
        if (isNaN(offer) || offer < 0 || offer >= 90) {
          console.error("Invalid offer value:", offer);
          return res.status(400).json({
            success: false,
            message: "Offer should be a number between 0 and 89",
          });
        }

        // await categoryModel.updateOne(
        //   { _id: _id },
        //   { $set: { offerInPercentage: discount } }
        // );

        categoryToUpdate.offerInPercentage = offer;

        const products = await productModel.aggregate([
          { $match: { category } },
        ]);
        console.log(products);

        for (const product of products) {
          if (!product.productWiseOffer) {
            console.log("here");
            await productModel.updateOne(
              { _id: product?._id },
              {
                $set: {
                  categoryWiseOffer: true,
                  offerInPercentage:offer,
                  discountPrice: Math.floor(
                    product?.price - (product?.price * offer) / 100
                  ),
                },
              }
            );
          }
        }
        // return res.status(200).json({ success: true, message: "Offer Applied" });

        
      }

      

      if (req.file) {
        categoryToUpdate.categoryImage = [req.file.filename];
      }

      const updatedCategory = await categoryToUpdate.save();

      console.log("Category updated successfully:", updatedCategory);

      res.status(200).json({
        success: true,
        data: updatedCategory,
        message: "Category updated successfully",
      });
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




// exports.updateProduct = async (req, res) => {
//   try {
//     upload.array("images")(req, res, async (err) => {
//       if (err) {
//         console.error("Error during file upload:", err);
//         return res.status(500).json({
//           success: false,
//           message: "Internal server error in file upload",
//         });
//       }
//       const productId = req.params.productId;

//       const { desc, price, category, name } = req.body;
//       const newImages = req.files?.map((file) => file.filename) || [];

//       const existingProduct = await productModel.findById(productId);

//       const updatedImages = existingProduct.productImage.concat(newImages);

//       const updatedProduct = {
//         _id: productId,
//         productName: name,
//         productImage: updatedImages,
//         price: Number(price),
//         Description: desc,
//         category: category,
//       };

//       await productModel.findByIdAndUpdate(productId, { $set: updatedProduct });

//       res.status(201).json({
//         success: true,
//         message: "Product updated",
//         data: { updatedProduct },
//       });
//     });
//   } catch (error) {
//     console.log("Error while updating product:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update product" });
//   }
// };

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
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    category.deleted = !category.deleted;

    await category.save();

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Error soft deleting category:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
