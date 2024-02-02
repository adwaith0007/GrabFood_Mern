import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import axios from "axios";
import foodimg from "../../../assets/login_food.png";

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    category: "",
    price: 0,
    images: [],
  });

  const [categoryList, setCategoryList] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/api/admin/category`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.error(error);
    }
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Check if the uploaded file is an image
      const isValidImage = Array.from(files).every((file) => file.type.startsWith("image/"));

      if (isValidImage) {
        setSelectedImages((prevImages) => [...prevImages, ...files]);

        setProduct((prevProduct) => ({
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

    setProduct((prevProduct) => {
      const updatedImages = [...prevProduct.images];
      updatedImages.splice(index, 1);
      return { ...prevProduct, images: updatedImages };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("desc", product.desc);
    formData.append("category", product.category);
    formData.append("price", product.price);

    product.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(`http://localhost:5000/api/admin/product/add`, formData);

      if (response.data.success) {
        toast.success("Product added");
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

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProduct((prevProduct) => ({ ...prevProduct, photoPrev: reader.result, photo: file }));
        }
      };
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handleFormSubmit}>
            <h2>New Product</h2>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input
                type="number"
                id="productPrice"
                placeholder="Price"
                name="price"
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDesc">Description</label>
              <input
                type="text"
                id="productDesc"
                placeholder="Description"
                name="desc"
                onChange={(e) => setProduct({ ...product, desc: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="min-w-[180px] w-[20vw] border border-teal-700 rounded-xl p-2 text-sm"
              >
                <option value="">----Choose options----</option>
                {categoryList.map((item, index) => (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
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
                <input type="file" id="imageInput" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
              </div>
            </div>

            {selectedImages.length > 0 && (
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
            )}

            {/* {product.photoPrev && <img src={product.photoPrev} alt="New Image" className="mt-4 rounded-md" />} */}
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300">
              Create
            </button>

           
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;