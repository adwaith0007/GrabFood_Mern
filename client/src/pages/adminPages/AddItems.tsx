import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "../../components/Navbar";
import foodimg from "../../assets/login_food.png";
import convertToBase64 from "../../helper/convert";

const AddItems = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/api/admin/category`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("white while loading categories");
      console.log(error);
    }
  }, []);

  const [item, setItem] = useState({
    name: "",
    desc: "",
    category: "",
    price: 0,
    images: [],
  });

  // const onUpload = async (e) => {
  //   const base64 = await convertToBase64(e.target.files[0]);
  //   setItem({ ...item, images: base64 });
  // };

  // const onUpload = async (e) => {
  //   const file = e.target.files[0];
  //   setItem({ ...item, images: file });
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(item);
    console.log(categoryList);

    const formData =new FormData();
    

    
    formData.append("name", item.name);
    formData.append("description", item.desc);
    formData.append("category", item.category);
    formData.append("price",item.price);
    item.images.forEach((file) => formData.append("files", file));

    
  

    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/items/add`,
         formData 
      );

      if (response.data.success) {
        toast.success("Product added");
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#e5d9ca] h-[100vh] w-full">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="container custom-height flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap justify-center items-center 2xl:p-8 ">
          <div className=" flex justify-center    ">
            <div className="w-full px-10 lg:h-[600px] lg:w-[470px] rounded-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>Add Item</h1>
              </div>
              <form
                onSubmit={handleFormSubmit}
                className="max-w-sm mx-auto mt-10 "
              >
                <div className="mb-5">
                  <label
                    htmlFor="itemName"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="name"
                    onChange={(e) =>
                      setItem({ ...item, name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="itemDesc"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="itemDesc"
                    name="desc"
                    onChange={(e) =>
                      setItem({ ...item, desc: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="productName"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="itemPrice"
                    name="price"
                    onChange={(e) =>
                      setItem({ ...item, price: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                <div className="flex flex-col my-4">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    
                    onChange={(e) =>
                      setItem({ ...item, category: e.target.value })
                    }
                    
                    className="  min-w-[180px] w-[20vw]  border border-teal-700 rounded-xl p-2 text-sm"
                  >
                    <option value="">----Choose options----</option>

                    {
                      categoryList.map((item, index) => (
                        <option key={index} value={item.category}>
                          {item.category}
                        </option>
                      ))}
                  </select>
                </div>

                <div className=" xl:flex w-full ">
                  <label htmlFor="itemImage">
                    {/* <img
                      className="h-[300px] rounded-l-[10px] lg:h-[200px] object-cover w-full "
                      src={item.images || foodimg}
                      alt=""
                    /> */}
                  </label>

                  <input
                    accept="image/*"
                    // onChange={onUpload}
                    onChange={(e)=>setItem({...item,images:[...e.target.files]})}
                    
                    type="file"
                    id="itemImage"
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

export default AddItems;
