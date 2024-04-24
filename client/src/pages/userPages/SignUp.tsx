

// import axios from "axios";


import '../../index.css'
import foodimg from "../../assets/login_food.png";
import { Link,useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useFormik } from "formik";

import { registerValidation } from '../../helper/validate'
    
import { registerUser } from "../../helper/helper";

import { useDispatch } from 'react-redux';


import { registerUserStore } from '../../redux/reducer/useReducer';

// import { setUser } from './../../redux/userSlice';



const SignUp = () => {

  
  const dispatch = useDispatch();

  const navigate = useNavigate()


    const formik = useFormik({
        initialValues : {
            fname:"",
            lname:"",
            username:"",
            email:"",
            password:"",
            phone:"",
            userid:"",
        },
        validate: registerValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values => {
          console.log(values);
          const registerPromise=registerUser(values);
          toast.promise(registerPromise,{
            loading:"Creating...",
            success:<b>Register Successfully...!</b>,
            error:<b>Could not Register.</b>
          })
          dispatch(registerUserStore(values.username));
          registerPromise.then(function(){navigate('/otp')})
          
        }
      })



  return (
    <div className="bg-[#e5d9ca] h-[100vh]    w-full ">
     

      {/* <Toaster position="top-center" reverseOrder={false} ></Toaster> */}
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
                <h1>Register</h1>
              </div>

              <form onSubmit={formik.handleSubmit}  className="max-w-sm mx-auto mt-5 ">

              <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="mb-2">
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      onChange={formik.handleChange}
                      value={formik.values.fname}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="lname"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      onChange={formik.handleChange}
                      value={formik.values.lname}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>
                </div>
                

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    User name
                  </label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     onChange={formik.handleChange}
                     value={formik.values.username}
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    // required
                  />
                </div>

                <div className="mb-3">
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
                    // required
                  />
                </div>

                <div className="mb-3">
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
                      to="/login"
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

export default SignUp;
