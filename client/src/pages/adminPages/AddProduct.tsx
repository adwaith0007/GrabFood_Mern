import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "../../components/Navbar";
import foodimg from "../../assets/login_food.png";
import convertToBase64 from "../../helper/convert";

const AddProduct = () => {
  const [categoryList, setCategoryList] = useState([]);

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

  const [product, setProduct] = useState({
    name: "",
    desc: "",
    category: "",
    price: 0,
    images: [],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // console.log(product);
    // console.log(categoryList);

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("desc", product.desc);
    formData.append("category", product.category);
    formData.append("price", product.price);

    // Append multiple images if allowed
    product.images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/product/add`,
        formData
      );

      
      

      if (response.data.success) {
        toast.success("Product added");
        // console.log(response.data);
      } else {
        toast.error(response.data.message);
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
        console.error("Error:", error.response.data.message);
      } else {
        toast.error(`Error: ${error.message}`);
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="bg-[#e5d9ca] h-[100vh] w-full">
      <div className="container custom-height flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap justify-center items-center 2xl:p-8 ">
          <div className=" flex justify-center    ">
            <div className="w-full px-10 lg:h-[600px] lg:w-[470px] rounded-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>Add Product</h1>
              </div>
              <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto mt-10 ">
                <div className="mb-5">
                  <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="name"
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="productDesc" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Description
                  </label>
                  <input
                    type="text"
                    id="productDesc"
                    name="desc"
                    onChange={(e) => setProduct({ ...product, desc: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="productPrice" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Price
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    name="price"
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="flex flex-col my-4">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="  min-w-[180px] w-[20vw]  border border-teal-700 rounded-xl p-2 text-sm"
                  >
                    <option value="">----Choose options----</option>

                    {categoryList.map((item, index) => (
                      <option key={index} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" xl:flex w-full ">
                  <label htmlFor="productImage">
                    <img
                      className="h-[300px] rounded-l-[10px] lg:h-[200px] object-cover w-full "
                      src={product.images.length > 0 ? URL.createObjectURL(product.images[0]) : foodimg}
                      alt=""
                    />
                  </label>

                  <input
                    // accept="image/*"
                    onChange={(e) => setProduct({ ...product, images: [...e.target.files] })}
                    type="file"
                    multiple
                    id="productImage"
                  />
                </div>

                <div className="flex justify-center w-full px-6 mt-10 ">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;