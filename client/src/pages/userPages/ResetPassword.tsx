

import "../../index.css";

import foodimg from "../../assets/login_food.png";
import {  useNavigate } from "react-router-dom";


import { useFormik } from "formik";
import { resetPassword } from "../../helper/helper";
import toast from "react-hot-toast";
// import { GoogleAuthProvider } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useLoginMutation } from "../../redux/api/userAPI";

// import { useSelector } from 'react-redux';
// import { selectUser } from './../../redux/userSlice';
// import { useDispatch } from 'react-redux';
// import { setUser } from './../../redux/userSlice';
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { MessageResponse } from "../../types/api-types";

const ResetPassword = () => {
 
    
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      
    },
    // validate:,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loginPromise = resetPassword({
        username: values.username,
        password: values.password,
        
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Password Updated Successfully...</b>,
        error: <b>Password not changed!</b>,
      });

      loginPromise.then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        // dispatch(setUser(values.username));
        navigate("/login");
      });
    },
  });

  

  


  return (
    <div className="bg-[#e5d9ca] h-[100vh] w-full ">
     

    <div className="container custom-height flex justify-center items-center mx-auto ">
      <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center   2xl:p-8 ">
        <div className="  hidden xl:flex w-1/2 ">
          <img
            className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
            src={foodimg}
            alt=""
          />
        </div>

        <div className=" flex justify-center">
          <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
            <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
              <h1>Reset Password</h1>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="max-w-sm mx-auto mt-10 "
            >
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                 User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="username"
                />
              </div>


              


              <div className="mb-5">
                <label
                  htmlFor="newpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  New Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="New Password"
                />
              </div>

              

             

             

              <div className="flex justify-center w-full px-6 ">
                <button
                  type="submit"
                  className="  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full  sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>

              
            </form>

          
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword