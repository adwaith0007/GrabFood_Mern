import {  useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import axios from "axios";
// import foodimg from "../../../assets/login_food.png";

import api from '../../../api';
// const server = import.meta.env.VITE_SERVER;

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    

    if (file) {
      // Check if the uploaded file is an image
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setCategoryData((prevData) => ({
          ...prevData,
          image: file,
        }));
      } else {
        toast.error("Please select a valid image file.");
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setCategoryData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", categoryData.name);

    if (categoryData.image) {
      formData.append('file', categoryData.image);
    }

    try {
      const response = await api.post(`/category/add`,formData);

      
      if (response.data.success) {
        toast.success("Category added");

        navigate("/admin/category");

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
          {selectedImage && (
            <div className="form-group">
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt={`Preview`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  onClick={handleRemoveImage}
                >
                  X
                </button>
              </div>
            </div>
          )}

          {categoryData.name.length > 0 && <p>{` ${categoryData.name}`}</p>}
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
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
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

export default AddCategory;
