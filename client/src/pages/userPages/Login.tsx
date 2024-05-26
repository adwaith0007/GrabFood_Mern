
import "../../index.css";
import foodimg from "../../assets/login_food.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { verifyPassword, generateOTP } from "../../helper/helper"; // Import generateOTP function
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/useReducer";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { registerUserStore } from '../../redux/reducer/useReducer';
import {log} from '../../../logger';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: { username: string; password: string }) => {
    const { success, verified, data } = await verifyPassword({
      username: values.username,
      password: values.password,
    });

    if (success) {
      const { token } = data;
      const userToken: any = jwtDecode(token);
      const user: any = {
        _id: userToken._id,
        name: userToken.name,
        email: userToken.email,
        photo: userToken.photo,
        role: userToken.role,
        gender: userToken.gender,
        token,
      };
      dispatch(userExist(user));
      Cookie.set("token", token, { path: '/',  sameSite: 'Lax' });
      toast.success(<b>Login Successfully...</b>);
      navigate("/home");
    } else if (verified === false) {
     // @ts-ignore
      dispatch(registerUserStore(values.username))
      await generateOTP(values.username); // Generate OTP
      toast.error("User is not verified");

      log.debug("values.username:", values.username )
      navigate("/otp"); // Navigate to OTP page
    } else {
      toast.error(<b>Password Not Match!</b>);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit,
  });

  return (
    <div className="bg-[#e5d9ca] h-[100vh] w-full ">
      <div className="container custom-height flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center   p-8 ">
          <div className="  hidden xl:flex w-1/2 ">
            <img
              className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
              src={foodimg}
              alt=""
            />
          </div>

          <div className=" flex justify-center    ">
            <div className=" w-full px-10 h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>Login</h1>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="max-w-sm min-w-[280px] mx-auto mt-10 "
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
                    <div className="flex items-center h-5 ">
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

                  <div>
                    <Link
                      to="/forgot_password"
                      className="text-gray-900 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center w-full mt-5 px-6 ">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;