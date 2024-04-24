

// import axios from "axios";


import '../../index.css'
import foodimg from "../../assets/login_food.png";
import { Link,useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

// import { adminRegisterValidation } from '../../helper/validate'
    
import {  registerAdmin } from "../../helper/helper";




const SignupPage = () => {

  const navigate = useNavigate()


    const formik = useFormik({
        initialValues : {
            userid:"",
            name:"",
            email:"",
            password:"",
            phone:"",
        },
        // validate: adminRegisterValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values => {
          console.log(values);
          const registerPromise=registerAdmin(values);
          toast.promise(registerPromise,{
            loading:"Creating...",
            success:<b>Register Successfully...!</b>,
            error:<b>Could not Register.</b>
          })

          registerPromise.then(function(){navigate('/admin')})
          
        }
      })



  return (
    <div className="bg-[#e5d9ca] h-[100vh]    w-full ">
      

      <Toaster position="top-center" reverseOrder={false} ></Toaster>
      <div className="container custom-height flex justify-center items-center mx-auto  ">
      <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center   2xl:p-8 xl:bg-gray-600 2xl:bg-black " >
          
          
          <div className="  hidden xl:flex w-1/2  ">
            <img
              className=" h-[600px]  rounded-l-[10px]  2xl:h-[600px] object-cover w-full  "
              src={foodimg}
              alt=""
            />
          </div>

          <div className=" flex justify-center   ">
            <div className=" w-full px-10 h-[600px] 2xl:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[20px]">
                <h1>Admin Register</h1>
              </div>

              <form onSubmit={formik.handleSubmit}  className="max-w-sm mx-auto mt-5 ">

              
                

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     onChange={formik.handleChange}
                     value={formik.values.name}
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    // required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                  Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                   
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="name@gmail.com"
                    // required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                   
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>

                

                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>

                <div className="flex justify-center mt-3 ">
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Have a account ? <span>Click hear to </span>{" "}
                    <Link
                      to="/admin"
                      className="font-medium text-blue-600 hover:underline "
                    >
                      Login
                    </Link>

                    <Link
                      to="/otp"
                      className="font-medium text-blue-600 hover:underline "
                    >
                      <br/>
                        
                        otp
                        
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
