import "./App.scss";
import  {jwtDecode } from 'jwt-decode';

import {
  // BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
// import { AuthorizeUser } from "./middleware/auth";
import { Toaster } from "react-hot-toast";
// import PrivateRoute from './Routes/PrivateRoute';

import Loader from "./components/loader";
import Navbar from "./components/Layout/Navbar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/useReducer";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/protected-route";

const ResetPasswordOtp = lazy(
  () => import("./pages/userPages/ResetPasswordOtp")
);
const ResetPassword = lazy(() => import("./pages/userPages/ResetPassword"));

const Login = lazy(() => import("./pages/userPages/Login"));
const Home = lazy(() => import("./pages/userPages/Home"));

const Otp = lazy(() => import("./pages/userPages/Otp"));
const SignUp = lazy(() => import("./pages/userPages/SignUp"));

const Demo = lazy(() => import("./pages/Demo"));

const LoginPage = lazy(() => import("./pages/adminPages/LoginPage"));
const SignupPage = lazy(() => import("./pages/adminPages/SignupPage"));

import Cookies from "js-cookie";



// import JwtPayload from "./types/types";

import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
// import UserLayout from "./components/Layout/UserLayout";

function App() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  // const [token, setToken] = useState(Cookies.get("token") || "");
  // const [role, setRole] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const user = jwtDecode(token);

      console.log(user);

      // setRole(user.role)

      console.log("Logged In");
      dispatch(userExist(jwtDecode(token)));

      // i have to fix this
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(user);
          const data = await getUser(user.uid);
          console.log("Logged In");
          dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
          console.log(" Not Logged In");
        }
      });
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Router> */}
        <Navbar user={user} />

        <Suspense fallback={<Loader />}>

          <Routes>


        






        <Route path="/" element={<Home />}></Route>

          <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/otp" element={<Otp />}></Route>
            <Route
              path="/resetpasswordotp"
              element={<ResetPasswordOtp />}
              ></Route>
            <Route path="/forgot_password" element={<ResetPassword />}></Route>

            <Route path="/admin/signup" element={<SignupPage />}></Route>
            <Route path="/admin" element={<LoginPage />}></Route>





               <Route
              element={
                <ProtectedRoute
                  isAuthenticated={true}
                  adminOnly={true}
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>



              <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/*" element={<UserRoutes />} />
            </Route>






              </Routes>





        {/* {role === 'user' && <UserRoutes/>} */}

  

          {/* <Routes>
           
            
            <Route path="/login" element={<ProtectedRoute isAuthenticated={user ? false : true}redirect="/"><Login setToken={setToken} /></ProtectedRoute>}></Route>
           
            <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}/>}>

            <Route path="/admin/*" element={<AdminRoutes />} />
              
            </Route>



            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/otp" element={<Otp />}></Route>
            <Route path="/resetpasswordotp" element={<ResetPasswordOtp />} ></Route>
            <Route path="/forgot_password" element={<ResetPassword />}></Route>


            <Route path="/admin/signup" element={<SignupPage />}></Route>
           <Route path="/admin" element={<LoginPage />}></Route>

            
            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
              <Route path="/*" element={<UserRoutes />} />
            </Route>




     
            <Route path="/demo" element={<Demo />}></Route>
           
            
          </Routes> */}

          {/* <Route>
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route> */}



            {/* now  ********** */}

          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={user ? false : true}
                  redirect="/"
                >
                  <Login 
                  // setToken={setToken}
                   />
                </ProtectedRoute>
              }
            ></Route>

            {/* <Route
              element={
                <ProtectedRoute
                  isAuthenticated={true}
                  adminOnly={true}
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route> */}


{/* <Route path="/product/*" element={<ProductRoutes />} /> */}

        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        {/* <Route path="/*" element={<UserRoutes />} /> */}

            
{/* <Route  element={<PrivateRoute roles={['admin']} />} >

<Route path="/admin/*" element={<AdminRoutes />} />
</Route> */}

{/* <Route path="/admin/*" element={<PrivateRoute roles={['admin']} element={<AdminRoutes />} />} /> */}


          {/* <Route 
              element={
                <PrivateRoute

                roles={['admin']}
                  
                />
              }
            >
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route> */}


            {/* <Route path="/" element={<UserLayout/>}>

            <Route path="/" element={<Home />}></Route>

            </Route> */}
   
           

            {/* <Route path="/" element={<Home />}></Route> */}
          

            {/* <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/*" element={<UserRoutes />} />
            </Route> */}

            <Route path="/demo" element={<Demo />}></Route>
          </Routes>
        </Suspense>

        <Toaster position="top-center" />
      {/* </Router> */}










 {/* <Router>


<Routes>

<Route path="/" element={<Layout />}>



<Route path="/" element={<Home />}></Route>
</Route>
</Routes>

</Router>  */}



    </>
  );
}

export default App;
