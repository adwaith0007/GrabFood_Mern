// import React, { useState } from "react";

// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Layout/Navbar";
// import convertToBase64 from "../../helper/convert";
// import foodimg from "../../assets/login_food.png";

// const AddCategory = () => {
//   const [category, setCategory] = useState("");
//   const [categoryImage, setCategoryImage] = useState();




//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formdata = new FormData();
//     formdata.append("category", category );
//     formdata.append('file',categoryImage)

//     console.log(category);
    

//     try {
//         const response = await axios.post(
//        `http://localhost:5000/api/admin/category/add`,
//          formdata )

       
//       console.log('Server response:', response.data);
      
//         if(response.data.success) {
//             toast.success(response.data.message);
//         }else{
//             toast.error("Error: " + response.data.message);
//         }
      
//     } catch (error) {
//       toast.error("Error not able to send data");
//       console.log(error);
//     }
//   }

//   return (
//     <div className="bg-[#e5d9ca] h-[100vh] w-full ">
     

//       <div className="container custom-height flex justify-center items-center mx-auto ">
//         <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center   2xl:p-8 ">
//           <div className=" flex justify-center    ">
//             <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-[10px] bg-[#f4eeee]">
//               <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
//                 <h1>AddCategory</h1>
//               </div>

//               <form
//                 onSubmit={handleFormSubmit}
//                 className="max-w-sm mx-auto mt-10 "
//               >
//                 <div className="mb-5">
//                   <label
//                     htmlFor="category"
//                     className="block mb-2 text-sm font-medium text-gray-900 "
//                   >
//                     Category Name
//                   </label>
//                   <input
//                     type="text"
//                     id="category"
//                     name="category"
                    

//                     onChange={(e) =>
//                       setCategory( e.target.value )
//                     }
                    
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                   />
//                 </div>

//                 <div className="  xl:flex w-full ">
//                   <label htmlFor="categoryImage">
//                     <img
//                       className=" h-[300px]  rounded-l-[10px]  lg:h-[200px] object-cover w-full "
//                       src={categoryImage || foodimg}
//                       alt=""
//                     />
//                   </label>

//                   <input
                  
//                     onChange={(e)=>setCategoryImage(e.target.files[0])}
//                    type="file"  id="categoryImage" />
//                 </div>

//                 <div className="flex justify-center w-full px-6 mt-10 ">
//                   <button
//                     type="submit"
//                     className="  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full  sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     Add Category
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

    
//   );
// };

// export default AddCategory;
