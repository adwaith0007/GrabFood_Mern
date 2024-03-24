const productModel = require("../Models/product");
// const  {upload}  = require("../middlewares/multer");

const multer = require("multer");

// exports.addProduct = async (req, res) => {
//   try {
//     upload.array("images")(req, res, async (err) => {
//       console.log(req.body);
//       console.log("ni2");
//       if (err) {
//         console.error("Error during file upload:", err);
//         return res.json({ success: false, message: err.message });
//       }

//       const images = req.files;
//       const filenames = images.map((file) => file.filename);

//       const { name, price, desc, category } = req.body;
//       if (!name || !price || !desc || !category) {
//         return res.json({ success: false, message: "Please add all fields" });
//       }

//       try {
//         const productDoc = new productModel({

//           productName: name,
//           Description: desc,
//           price,
//           category,
//           productImage: filenames,
//         });

//         console.log(productDoc);

//         await productDoc.save();

//         res
//           .status(201)
//           .json({ success: true, message: "Product added successfully" });
//       } catch (error) {
//         res
//           .status(500)
//           .json({
//             success: false,
//             message: "Internal server error in saving product",
//           });
//       }
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal server error in file upload",
//       });
//   }
// };


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing
  },
});

const upload = multer({ storage: storage });

exports.addProduct = async (req, res) => {
  try {
    // Multer middleware for handling file uploads
    upload.array("images")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error in file upload",
        });
      }

      const images = req.files;
      if (!images || images.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No images uploaded" });
      }

      const filenames = images.map((file) => file.filename);

      const { name, price, desc, category } = req.body;
      if (!name || !price || !desc || !category) {
        return res
          .status(400)
          .json({ success: false, message: "Please add all fields" });
      }

      try {
        const productDoc = new productModel({
          productName: name,
          Description: desc,
          price,
          category,
          productImage: filenames,
        });

        productDoc.productId = productDoc._id;

        await productDoc.save();

        res.status(201).json({ success: true, message: "Product added successfully" });
      } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error in saving product",
        });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// exports.addProduct = async (req, res) => {
//   try {
//     upload.array("images")(req, res, async (err) => {
//       if (err) {
//         console.error("Error during file upload:", err);
//         return res
//           .status(500)
//           .json({
//             success: false,
//             message: "Internal server error in file upload",
//           });
//       }

//       const images = req.files;
//       if (!images || images.length === 0) {
//         return res.status(400).json({ success: false, message: 'No images uploaded' });
//       }
//       const filenames = images?.map((file) => file.filename);

//       const { name, price, desc, category } = req.body;
//       if (!name || !price || !desc || !category) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Please add all fields" });
//       }

//       try {
//         const productDoc = new productModel({
//           productName: name,
//           Description: desc,
//           price,
//           category,
//           productImage: filenames,
//         });

//         productDoc.productId = productDoc._id;

//         console.log(productDoc);

//         await productDoc.save();

//         res
//           .status(201)
//           .json({ success: true, message: "Product added successfully" });
//       } catch (error) {
//         console.error(error);
//         res
//           .status(500)
//           .json({
//             success: false,
//             message: "Internal server error in saving product",
//           });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// exports.listProduct = async (req, res) => {
//   try {
//     console.log('in');

    
//     if (req.query.category && req.query.category === "All Products") {
      
//       const data = await productModel.find({});
//       res.status(200).json({ success: true, data: data });
//     } else if (req.query.category) {
      
//       const category = req.query.category;
//       console.log(category);
      
//       const filteredProducts = await productModel.find({ category });
//       console.log(filteredProducts);
      
//       res.status(200).json({ success: true, data: filteredProducts });
//     } else {
      
//       const data = await productModel.find({});
//       res.status(200).json({ success: true, data: data });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



exports.listProduct = async (req, res) => {
  try {
    // Set default values for page and limit
    const page = parseInt(req.query.page) || 1;
    const limit =  parseInt(req.query.limit) || 10; 

    
    const skip = (page - 1) * limit;
    let query = {};

    
    if (req.query.category && req.query.category !== "All Products") {
      query.category = req.query.category;
    }

    
    const totalCount = await productModel.countDocuments(query);

    
    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit);

    
    const totalPages = Math.ceil(totalCount / limit);

    
    res.status(200).json({
      success: true,
      data: products,
      totalPages: totalPages,
      currentPage: page,
      totalCount: totalCount
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProduct = async (req, res) => {

  try {
   
    
    const query = req.query.q; 
    console.log(query);
    
    const results = await productModel.find({ $text: { $search: query } });
    if (results.length === 0) {
      
      const partialMatchResults = await productModel.find({ productName: { $regex: new RegExp(query, 'i') } });
      res.status(200).json({ success: true, data: partialMatchResults });
    } else {
      res.status(200).json({ success: true, data: results });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}



exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await productModel.findById(productId);

    if (!productDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { name, price, category } = req.body;

//     console.log(productId);

//     console.log(name);

//     // Update other fields as needed
//     // ...

//     // Update the product image if a new one is provided
//     if (req.file) {
//       const photoPath = req.file.path; // Assuming 'path' is a field added by multer
//       // Update the product image path in the database
//       // ...
//     }

//     // Update the product in the database
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       productId,
//       { name, price, category, productImage: photoPath },
//       { new: true }
//     );

//     // Send a success response
//     res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
//   } catch (error) {
//     console.error('Error updating product', error);
//     res.status(500).json({ success: false, message: 'Failed to update product' });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     upload.single("photo")(req, res, async (err) => {
//       if (err) {
//         return res.json({ success: false, message: err.message });
//       }

//       const productId = req.params.productId;

//       console.log(req.body);

//       console.log(productId);

//       const { desc, price, category, name } = req.body;
//       const image = req.file?.filename;

//       await productModel.findOneAndUpdate(
//         { _id: productId },
//         {
//           $set: {
//             Description: desc,

//             price: price,
//             category: category,
//             productName: name,
//           },
//         }
//       );

//       await productModel.updateOne(
//         { _id: productId },
//         { $push: { images: image } }
//       );

//       res.status(201).json({ success: true, message: "Product updated" });
//     });
//   } catch (error) {
//     console.log("error while editing form", error);
//   }
// };

// now

// exports.updateProduct = async (req, res) => {
//   try {
//     upload.single("photo")(req, res, async (err) => {
//       if (err) {
//         return res.json({ success: false, message: err.message });
//       }

//       const productId = req.params.productId;

//       console.log(req.body);

//       console.log(productId);

//       const { desc, price, category, name } = req.body;
//       const image = req.file?.filename;

//       const updatedProduct = {
//         Description: desc,
//         category: category,
//         productName: name,
//       };

//       if (category !== undefined) {
//         updatedProduct.category = category;
//       }

//       // Check if price is a valid number before updating
//       if (!isNaN(Number(price))) {
//         updatedProduct.price = Number(price);
//       }

//       if (image) {
//         updatedProduct.images = [image];
//       }

//       await productModel.findOneAndUpdate({ _id: productId }, { $set: updatedProduct });

//       res.status(201).json({ success: true, message: "Product updated" });
//     });
//   } catch (error) {
//     console.log("error while editing form", error);
//     res.status(500).json({ success: false, message: "Failed to update product" });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    upload.array("images")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "Internal server error in file upload",
            
          });
      }
      const productId = req.params.productId;

      console.log(req.file);

      console.log(req.body);
      
      

      const { desc, price, category, name } = req.body;
      const newImages = req.files?.map((file) => file.filename) || [];

      const existingProduct = await productModel.findById(productId);

      const updatedImages = existingProduct.productImage.concat(newImages);

      const updatedProduct = {
        _id:productId,
        productName: name,
        productImage: updatedImages,
        price: Number(price),
        Description: desc,
        category: category,
      };

      await productModel.findByIdAndUpdate(productId, { $set: updatedProduct });

      res.status(201).json({ success: true, message: "Product updated", data:{updatedProduct} });
    });
  } catch (error) {
    console.log("Error while updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { imageName } = req.body;

    const existingProduct = await productModel.findById(productId);

    const imageIndex = existingProduct.productImage.indexOf(imageName);

    if (imageIndex !== -1) {
      existingProduct.productImage.splice(imageIndex, 1);

      await productModel.findByIdAndUpdate(productId, {
        $set: { productImage: existingProduct.productImage },
      });

      res
        .status(200)
        .json({ success: true, message: "Image deleted successfully!" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Image not found in the product" });
    }
  } catch (error) {
    console.error("Error deleting image", error);
    res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};



exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productModel.findOneAndDelete({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// export const newProduct = TryCatch(
//   async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
//     const { name, price, stock, category } = req.body;
//     const photo = req.file;

//     if (!photo) return next(new ErrorHandler("Please add Photo", 400));

//     if (!name || !price || !stock || !category) {
//       rm(photo.path, () => {
//         console.log("Deleted");
//       });

//       return next(new ErrorHandler("Please enter All Fields", 400));
//     }

//     await Product.create({
//       name,
//       price,
//       stock,
//       category: category.toLowerCase(),
//       photo: photo.path,
//     });

//     invalidateCache({ product: true, admin: true });

//     return res.status(201).json({
//       success: true,
//       message: "Product Created Successfully",
//     });
//   }
// );
