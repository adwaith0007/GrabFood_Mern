const productModel = require("../Models/product");
const upload = require("../middlewares/multer");
const orderModel = require("../Models/order");
const categoryModel = require("../Models/Category");



exports.addProduct = async (req, res) => {
  try {
    
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

      const filenames = images.map((file) => file.filename
    
    );
    console.log("filenames:", filenames)

      let { name, price, desc, category } = req.body;
      if (!name || !price || !desc || !category) {
        return res
          .status(400)
          .json({ success: false, message: "Please add all fields" });
      }

      name = name.trim();

      if (name.length < 3) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Product name should be at least 3 characters long",
          });
      }

      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({
          success: false,
          message: "Product name should contain only letters and spaces",
        });
      }

      price = parseFloat(price);
      if (isNaN(price) || price <= 5) {
        return res.status(400).json({
          success: false,
          message: "Price should be a number greater than 5",
        });
      }

      const productExist = await productModel.findOne({
        productName: { $regex: new RegExp(`^${name}$`, "i") },
        
      });

      if (productExist) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists" });
      }

      try {
        const productDoc = new productModel({
          productName: name,
          Description: desc,
          price,
          category,
          productImage: filenames,
          createdAt:new Date()
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





exports.listProduct = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit =  parseInt(req.query.limit) || 10; 

    
    const skip = (page - 1) * limit;
    let query = {};

    
    if (req.query.category && req.query.category !== "ALL PRODUCTS") {
      query.category = req.query.category;
    }

    
    const totalCount = await productModel.countDocuments(query);

    
    const products = await productModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    
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



exports.listProductUserSide = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Initialize the query object with deleted set to false
    let query = { deleted: false };

    // Add category condition if provided and not "ALL PRODUCTS"
    if (req.query.category && req.query.category !== "ALL PRODUCTS") {
      query.category = req.query.category;
    }

    // Get the total count of products matching the query
    const totalCount = await productModel.countDocuments(query);

    // Fetch the products based on the query with pagination
    const products = await productModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Send the response with the products and pagination info
    res.status(200).json({
      success: true,
      data: products,
      totalPages: totalPages,
      currentPage: page,
      totalCount: totalCount
    });
  } catch (error) {
    // Handle errors and send a 500 response with the error message
    return res.status(500).json({ success: false, message: error.message });
  }
};





// exports.listBestProduct = async (req, res) => {


//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Aggregate pipeline to find top 10 best-selling products
//     const topProducts = await orderModel.aggregate([
//       { $match: { paymentStatus: true } }, // Filter orders with paymentStatus true
//       { $unwind: "$products" }, // Split the products array into separate documents
//       {
//         $group: {
//           _id: "$products.productId", // Group by product ID
//           productName: { $first: "$products.productName" }, // Get the product name
//           productImage: { $first: "$products.productImage" },
//           price: { $first: "$products.price" },
//           Description: { $first: "$products.Description" },
//           category: { $first: "$products.category" },
//           discountPrice: { $first: "$products.discountPrice" },
//           productName: { $first: "$products.productName" },
//           totalQuantitySold: { $sum: "$products.quantity" } // Sum the quantity sold
//         }
//       },
//       { $sort: { totalQuantitySold: -1 } }, // Sort by total quantity sold in descending order
//       { $limit: 10 } // Get only the top 10 best-selling products
//     ]);

//     res.status(200).json({
//       success: true,
//       data: topProducts,
//       totalPages: 1, // Since we're not implementing pagination for best-selling products
//       currentPage: 1, // Since we're not implementing pagination for best-selling products
//       totalCount: topProducts.length // Length of topProducts array
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }


// }



// exports.listBestProduct = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Aggregate pipeline to find top 10 best-selling products
//     const topProducts = await orderModel.aggregate([
//       { $match: { paymentStatus: true } }, // Filter orders with paymentStatus true
//       { $unwind: "$products" }, // Split the products array into separate documents
//       {
//         $group: {
//           _id: "$products.productId", // Group by product ID
//           totalQuantitySold: { $sum: "$products.quantity" } // Sum the quantity sold
//         }
//       },
//       { $sort: { totalQuantitySold: -1 } }, // Sort by total quantity sold in descending order
//       { $limit: 10 } // Get only the top 10 best-selling products
//     ]);

//     // Extract product IDs from the aggregation result
//     const productIds = topProducts.map(product => product._id);

//     // Fetch product details from the productModel
//     const productDetails = await productModel.find({ _id: { $in: productIds } });

//     res.status(200).json({
//       success: true,
//       data: productDetails,
//       totalPages: 1, // Since we're not implementing pagination for best-selling products
//       currentPage: 1, // Since we're not implementing pagination for best-selling products
//       totalCount: productDetails.length // Length of productDetails array
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



exports.listBestProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const topProducts = await orderModel.aggregate([
      { $match: { paymentStatus: true } }, 
      { $unwind: "$products" }, 
      {
        $group: {
          _id: "$products.productId", 
          totalQuantitySold: { $sum: "$products.quantity" } 
        }
      },
      { $sort: { totalQuantitySold: -1 } }, 
      { $limit: 10 } 
    ]);

    
    const productIds = topProducts.map(product => product._id);

    
    const productDetails = await productModel.find({ _id: { $in: productIds }, deleted: false });

    
    const combinedProducts = productDetails.map(product => {
      const totalQuantitySold = topProducts.find(item => item._id.equals(product._id))?.totalQuantitySold || 0;
      return {
        ...product.toObject(), 
        totalQuantitySold: totalQuantitySold
      };
    });

    res.status(200).json({
      success: true,
      data: combinedProducts,
      totalPages: 1, 
      currentPage: 1, 
      totalCount: combinedProducts.length 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.listLowToHighProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const products = await productModel.find({ deleted: false }).sort({ price: 1 }).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: products,
      totalPages: Math.ceil(products.length / limit),
      currentPage: page,
      totalCount: products.length
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.listHighToLowProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const products = await productModel.find({ deleted: false }).sort({ price: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: products,
      totalPages: Math.ceil(products.length / limit),
      currentPage: page,
      totalCount: products.length
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProduct = async (req, res) => {

  try {
   
    
    const query = req.query.q; 
    console.log(query);
    
    const results = await productModel.find({ $text: { $search: query }, deleted: false  });
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
//       const productId = req.params.productId;

//       console.log(req.file);

//       console.log(req.body);
      
      

//       let { desc, price, category, name, offer } = req.body;
//       const newImages = req.files?.map((file) => file.filename) || [];

//       name = name.trim();

//       if (name.length < 3) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message: "Product name should be at least 3 characters long",
//           });
//       }

//       const nameRegex = /^[A-Za-z\s]+$/;
//       if (!nameRegex.test(name)) {
//         return res.status(400).json({
//           success: false,
//           message: "Product name should contain only letters and spaces",
//         });
//       }

//       price = parseFloat(price);
//       if (isNaN(price) || price <= 5) {
//         return res.status(400).json({
//           success: false,
//           message: "Price should be a number greater than 5",
//         });
//       }

//       const productExist = await productModel.findOne({
//         productName: { $regex: new RegExp(`^${name}$`, "i") },
//         _id: { $ne: productId }
//       });
  
//       console.log("C_exist:", productExist);
  
//       if (productExist) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Product already exists" });
//       }

//       const existingProduct = await productModel.findById(productId);

//       const updatedImages = existingProduct.productImage.concat(newImages);

//       if (offer !== undefined) {
       
//         if (isNaN(offer) || offer < 0 || offer >= 90) {
//           console.error("Invalid offer value:", offer);
//           return res.status(400).json({
//             success: false,
//             message: "Offer should be a number between 0 and 89",
//           });
//         }

//         // await categoryModel.updateOne(
//         //   { _id: _id },
//         //   { $set: { offerInPercentage: discount } }
//         // );

//         // productToUpdate.offerInPercentage = offer;

//         const product = await productModel.findById(productId);

        
//             await productModel.updateOne(
//               { _id: productId },
//               {
//                 $set: {
//                   productWiseOffer: true,
//                   offerInPercentage:offer,
//                   discountPrice: Math.floor(
//                     product?.price - (product?.price * offer) / 100
//                   ),
//                 },
//               }
//             );
          
//         // return res.status(200).json({ success: true, message: "Offer Applied" });

        
//       }


//       const updatedProduct = {
//         _id:productId,
//         productName: name,
//         productImage: updatedImages,
//         price: Number(price),
//         Description: desc,
//         category: category,
//       };

//       await productModel.findByIdAndUpdate(productId, { $set: updatedProduct });

//       res.status(201).json({ success: true, message: "Product updated", data:{updatedProduct} });
//     });
//   } catch (error) {
//     console.log("Error while updating product:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update product" });
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
      
      

      let { desc, price, category, name, offer } = req.body;

      console.log("offer", offer )

      const newImages = req.files?.map((file) => file.filename) || [];

      name = name.trim();

      if (name.length < 3) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Product name should be at least 3 characters long",
          });
      }

      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({
          success: false,
          message: "Product name should contain only letters and spaces",
        });
      }

      price = parseFloat(price);
      if (isNaN(price) || price <= 5) {
        return res.status(400).json({
          success: false,
          message: "Price should be a number greater than 5",
        });
      }

      const productExist = await productModel.findOne({
        productName: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: productId }
      });
  
      console.log("C_exist:", productExist);
  
      if (productExist) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists" });
      }

      const existingProduct = await productModel.findById(productId);

      const updatedImages = existingProduct.productImage.concat(newImages);

      const productToUpdate = {
        _id:productId,
        productName: name,
        productImage: updatedImages,
        price: Number(price),
        Description: desc,
        category: category,
        createdAt:new Date()
      };


      if (offer !== undefined) {
        const parsedOffer = parseFloat(offer);
        if (isNaN(parsedOffer) || parsedOffer < 0 || parsedOffer >= 90) {
          return res.status(400).json({
            success: false,
            message: "Offer should be a number between 0 and 89",
          });
        }

        productToUpdate.productWiseOffer = true;
        productToUpdate.offerInPercentage = parsedOffer;

        if(offer > 0){
          
          productToUpdate.discountPrice= Math.floor( price - (price * offer) / 100);
          productToUpdate.productWiseOffer = true;
        }else{

          productToUpdate.discountPrice=0;

          productToUpdate.productWiseOffer = false;

        }
        


      }

      await productModel.findByIdAndUpdate(productId, { $set: productToUpdate });

      res.status(201).json({
        success: true,
        message: "Product updated",
        data: { updatedProduct: productToUpdate },
      });
     

     
    });
  } catch (error) {
    console.log("Error while updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};




// exports.softDeleteProduct = async (req, res) => {
//   const { productId } = req.params;

  

//   try {
//     const product = await productModel.findById(productId);

//     console.log("softDeletePro:", product )

//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     product.deleted = !product.deleted;

//     await product.save();

//     return res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     console.error("Error soft deleting product:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };



exports.softDeleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findById(productId);

    console.log("Product fetched:", product);

    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.deleted === undefined) {
      console.error("Product does not have a 'deleted' field.");
      return res.status(500).json({ success: false, message: "Product schema error" });
    }

    product.deleted = !product.deleted;

    try {
      await product.save();
      console.log("Product after toggle:", product);
      return res.status(200).json({ success: true, data: product });
    } catch (saveError) {
      console.error("Error saving product:", saveError);
      return res.status(500).json({ success: false, message: "Error saving product" });
    }

  } catch (error) {
    console.error("Error soft deleting product:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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


    // const existingOrder = await orderModel.findById({'products.productId' : productId})

    // if(existingOrder){

    //   res.status(400).json({ success: false , message: "no order " });

    // }

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
