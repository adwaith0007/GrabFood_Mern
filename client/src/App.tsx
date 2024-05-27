

import "./App.scss";
import { jwtDecode } from "jwt-decode";

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

import Loader from "./components/loader";
import Navbar from "./components/Layout/Navbar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/useReducer";
// import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./Routes/protected-route";
// import { Navigate } from 'react-router-dom';

import { log } from '../logger';

const ResetPasswordOtp = lazy(
  () => import("./pages/userPages/ResetPasswordOtp")
);
const ResetPassword = lazy(() => import("./pages/userPages/ResetPassword"));

const Login = lazy(() => import("./pages/userPages/Login"));
const Home = lazy(() => import("./pages/userPages/Home"));

const Otp = lazy(() => import("./pages/userPages/Otp"));
const SignUp = lazy(() => import("./pages/userPages/SignUp"));

const LoginPage = lazy(() => import("./pages/adminLogin/LoginPage"));
const SignupPage = lazy(() => import("./pages/adminLogin/SignupPage"));

import Cookies from "js-cookie";

import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";

function App() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

 

  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = Cookies.get("token");
    
    if (token) {
      const user = jwtDecode(token);
      
      log.info("Info message: this is the user:", user);
     
      // setRole(user.role)

     
      dispatch(userExist(jwtDecode(token)));

      // i have to fix this
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          
          // const data = await getUser(user.uid);

          // console.log("user redux:", data.user);
          
          // dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
          log.error(" Not Logged In");
        }
      });
    }
  }, []);
  
  return (
    <>
      {loading && <Loader />}
      <Navbar user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/resetpasswordotp" element={<ResetPasswordOtp />} />
          <Route path="/forgot_password" element={<ResetPassword />} />
          <Route path="/admin/signup" element={<SignupPage />} />
          <Route path="/admin" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={!!user}
                adminOnly={true}
                admin={user?.role === "admin"}
              />
            }
          >
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={!!user}
                role={user?.role}
                userOnly={true}
              />
            }
          >
            <Route path="/*" element={<UserRoutes />} />
          </Route>
        </Routes>

        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Login />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
