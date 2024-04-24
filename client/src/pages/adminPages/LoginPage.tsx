

import '../../index.css';

import foodimg from "../../assets/login_food.png";
import { Link,useNavigate } from "react-router-dom";


import { useFormik } from "formik";
import { adminVerifyPassword } from "../../helper/helper";
import toast from "react-hot-toast";

import Cookie from "js-cookie";

const LoginPage = () => {

  const navigate = useNavigate();

 const formik = useFormik({
  initialValues:{
    email:"",
    password:""
  },
  // validate:,
  validateOnBlur:false,
  validateOnChange:false,
  onSubmit: async values =>{
    const loginPromise = adminVerifyPassword({email:values.email,password:values.password})
    toast.promise(loginPromise,{
      loading:'Checking...',
      success:<b>Login Successfully...</b>,
      error:<b>Password Not Match!</b>
    });

    loginPromise.then(res =>{
      const {token} = res.data;
      localStorage.setItem('token',token);
      Cookie.set("token", token, { sameSite: true });
      navigate('/admin/dashboard')
     
    })

  }
 })


  return (
    <div className="bg-[#e5d9ca] h-[100vh] w-full ">
      {/* <Navbar />

      <Toaster position="top-center" reverseOrder={false} ></Toaster> */}

      <div className="container custom-height flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center   2xl:p-8 " >
          
          
          <div className="  hidden xl:flex w-1/2 ">
            <img
              className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
              
              src={foodimg}
              alt=""
            />
          </div>

          <div className=" flex justify-center    ">
            <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>Admin Login</h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto mt-10 ">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="name@gmail.com"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your password
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

              <div className="flex flex-row justify-between ">
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Remember me
                  </label>
                </div>

                <Link to="#" className="text-gray-900 hover:underline">
                  Forgot password?
                </Link>
              </div>


             

              <div className="flex justify-center w-full px-6 ">
                <button
                  type="submit"
                  className="  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full  sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>

              

              <div className="flex justify-center mt-3 ">
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Don’t have an account yet?
                  <Link
                    to="/admin/signup"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Sign Up
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

export default LoginPage;
