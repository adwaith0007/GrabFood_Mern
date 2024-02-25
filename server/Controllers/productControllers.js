const productModel = require("../Models/product");
const {upload} = require("../middlewares/multer");

exports.addProduct = async (req, res) => {
  
  try { 
    
     
      upload.array("images")(req, res, async (err) => {
        console.log(req.body);
        console.log('ni2');
        if (err) {
          console.error('Error during file upload:', err);
          return res.json({ success: false, message: err.message });
        }

      const images = req.files; // Updated variable name to clarify it's an array of images

      const { name, price, desc, category } = req.body;
      if (!name || !price || !desc || !category) {
        return res.json({ success: false, message: "Please add all fields" });
      }

      try {
        const productDoc = new productModel({
          productName: name,
          Description: desc,
          price,
          category,
          productImage: images, // Assuming productImage is an array of file paths
        });

        console.log(productDoc);
        

        await productDoc.save();
  
        res.status(201).json({ success: true, message: "Product added successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error in saving product" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error in file upload" });
  }
};



exports.listProduct = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await productModel.findById(productId);

    if (!productDetails) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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




exports.updateProduct = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const productId = req.params.productId;

      console.log(req.body);

      console.log(productId);
      
      

      const {  desc,  price, category,  name } =
        req.body;
      const image = req.file?.filename;

      await productModel.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
           
            
Description: desc,
            
            price: price,
            category: category,
            productName: name,
            
          },
        }
      );

      await productModel.updateOne({ _id: productId }, { $push: { images: image } });

      res.status(201).json({ success: true, message: "Product updated" });
    });
  } catch (error) {
    console.log("error while editing form", error);
  }
};






exports.deleteProduct= async (req,res)=>{

  console.log('hiiiii');
  
  
}


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

