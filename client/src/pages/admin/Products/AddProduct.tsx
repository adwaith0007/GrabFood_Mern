import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import api from '../../../api';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    category: "",
    price: "",
    images: [],
  });

  const [categoryList, setCategoryList] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    try {
      api.get(`/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.error(error);
    }
  }, []);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    setSelectedImages([...selectedImages, ...newImages]);

    await setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...newImages], 
    }));

    // Log selected images and updated product state
    console.log("Selected Images:", newImages);
    // console.log("Updated Product State:", {
    //   ...product,
    //   images: [...product.images, ...newImages], // Ensure images array is updated
    // });

    console.log(product.images);
    

  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(product.images);
    

    console.log(product.images.forEach((file) => file ));

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("desc", product.desc);
      formData.append("category", product.category);
      formData.append("price", product.price);
      // product.images.forEach((file) => formData.append("images", file));

      // product.images.forEach((file, index) =>{ formData.append(`image_${index}`, file); console.log("Appended file:", file)});

      product.images.forEach((file) =>{ formData.append(`images`, file); console.log("Appended file:", file)});

      // product.images.forEach((file) => {
      //   formData.append("images", file);
      //   console.log("Appended file:", file);
      // });

      // Log FormData object just before the request is sent
      console.log("FormData:", formData);

      const response = await api.post(`/product/add`, formData);

      if (response.data.success) {
        toast.success("Product added");
        // Reset form fields and selected images after successful submission
        setProduct({
          name: "",
          desc: "",
          category: "",
          price: "",
          images: [],
        });
        setSelectedImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          {/* Display selected category */}
          {product.category && <p>{product.category}</p>}
          
          {/* Display selected images */}
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
          
          {/* Display product name */}
          {product.name && <p>{product.name}</p>}
          
          {/* Display product price */}
          {product.price && <h3>₹{product.price}</h3>}
          
          {/* Display product description */}
          {product.desc && <p>{product.desc}</p>}
        </section>

        <article>
          <form onSubmit={handleFormSubmit}>
            <h2>New Product</h2>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input
                type="number"
                id="productPrice"
                placeholder="Price"
                name="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDesc">Description</label>
              <input
                type="text"
                id="productDesc"
                placeholder="Description"
                name="desc"
                value={product.desc}
                onChange={(e) =>
                  setProduct({ ...product, desc: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
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
  );
};

export default AddProduct;
