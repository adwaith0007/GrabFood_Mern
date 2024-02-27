import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import axios from "axios";
import foodimg from "../../../assets/login_food.png";

const NewCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: "",
        images: [],
      });
    
     
    
      const [selectedImages, setSelectedImages] = useState([]);

      const [category, setCategory] = useState("");
  // const [categoryImage, setCategoryImage] = useState();
    
    
    
      const handleImageChange = (e) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
          // Check if the uploaded file is an image
          const isValidImage = Array.from(files).every((file) =>
            file.type.startsWith("image/")
          );
    
          if (isValidImage) {
            setSelectedImages((prevImages) => [...prevImages, ...files]);
    
            setCategoryData((prevProduct) => ({
              ...prevProduct,
              images: [...prevProduct.images, ...files],
            }));
          } else {
            toast.error("Please select valid image files.");
          }
        }
      };
    
      const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages.splice(index, 1);
          return updatedImages;
        });
    
        setCategoryData((prevProduct) => {
          const updatedImages = [...prevProduct.images];
          updatedImages.splice(index, 1);
          return { ...prevProduct, images: updatedImages };
        });
      };
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formdata = new FormData();
        formdata.append("category", categoryData.name );
        // formdata.append('file',categoryImage)
    
        categoryData.images.forEach((file) => {
          formdata.append("images", file);
        });
    
        try {
          const response = await axios.post(
            `http://localhost:5000/api/category/add`,
            formdata
          );
    
          if (response.data.success) {
            toast.success("Category added");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error.response) {
            toast.error(`Error: ${error.response.data.message}`);
          } else {
            toast.error(`Error: ${error.message}`);
          }
        }
      };
    
    
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>

        
          {selectedImages.length > 0 && (
            <div className="form-group">
              <div className="grid grid-cols-3 gap-4 mt-1">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {categoryData.name.length > 0 && <p>{` ${categoryData.name}`}</p>}

          {/* {product.price > 0 && <h3>₹{product.price}</h3>} */}

          {/* {product.desc.length > 0 && <p className="" >{product.desc}</p>} */}
        </section>

        <article>
          <form onSubmit={handleFormSubmit}>
            <h2>New Category</h2>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
              />
            </div>
            
           

           

            <div className="form-group">
              <label>Photo</label>
              <div className="flex items-center">
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Upload Images
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* {selectedImages.length > 0 && (
              <div className="form-group">
                
                <div className="grid grid-cols-3 gap-4 mt-1">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-md" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* {product.photoPrev && <img src={product.photoPrev} alt="New Image" className="mt-4 rounded-md" />} */}
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300"
            >
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  )
}

export default NewCategory