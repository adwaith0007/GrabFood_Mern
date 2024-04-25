// import React from "react";
// import Navbar from "../../components/Layout/Navbar";
import "../../index.css";
// import axios from "axios";
import foodimg from "../../assets/login_food.png";
import { Link, useNavigate } from "react-router-dom";
import glogo from "../../assets/googlelogo.png";
// import {  useState } from "react";
import { useFormik } from "formik";
import { verifyPassword } from "../../helper/helper";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useLoginMutation } from "../../redux/api/userAPI";

// import { useSelector } from "react-redux";
// import { selectUser } from "./../../redux/userSlice";
import { useDispatch } from "react-redux";
import { userExist, 
  // userNotExist
 } from "../../redux/reducer/useReducer";
// import { setUser } from "./../../redux/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";

import Cookie from "js-cookie";

import { jwtDecode } from "jwt-decode";

// const Login = ({ setToken }) => {

const Login = () => {
  // const [gender, setGender] = useState("");
  // const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const dispatch = useDispatch();

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
      const loginPromise = verifyPassword({
        username: values.username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise.then((res) => {
        const { token } = res.data;

        const userToken :any = jwtDecode(token);

        const user:any = {
          _id: userToken._id,
          name: userToken.name,
          email: userToken.email,
          photo: userToken.photo,
          role: userToken.role,
          gender: userToken.gender,
          token,
        };

        console.log(user);

        dispatch(userExist(user));

        // Cookie.set("token", token, { sameSite: true });

        Cookie.set("token", token, { path: '/',  sameSite: 'Lax' });

        // setToken(token);
        navigate("/");
      });
    },
  });

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);

      console.log({
        lname: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: "sdfg",
        role: "user",
        // dob: date,
        _id: user.uid,
      });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: "male",
        role: "user",
        dob: "5647",
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }

      // console.log(user)
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  // project-1066668375532

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

          <div className=" flex justify-center    ">
            <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>Login</h1>
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
                    username
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
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="/forgot_password"
                    className="text-gray-900 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex flex-row gap-5 mb-4 items-center ">
                  <div className="h-[2px] w-[40%] bg-[#D9D9D9]"></div>
                  <p>OR</p>
                  <div className="h-[2px] w-[40%] bg-[#D9D9D9]"></div>
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
                      to="/signup"
                      className="font-medium text-blue-600 hover:underline "
                    >
                      Sign Up
                    </Link>
                    .
                  </p>
                </div>
              </form>

              <div className="w-full px-6 ">
                <button
                  onClick={loginHandler}
                  type="button"
                  className="flex w-full bg-white py-2 rounded shadow-md mb-4 text-black justify-center gap-4  "
                >
                  <img src={glogo} alt=""></img>
                  <p>Sign in with Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
