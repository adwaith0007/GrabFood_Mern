

import './App.scss'

import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import { lazy,Suspense, useState } from 'react'; 
import { useEffect } from 'react';
import { AuthorizeUser } from './middleware/auth';
import { Toaster } from 'react-hot-toast';

import Loader from './components/loader';
import Navbar from './components/Navbar';
import Category from './pages/admin/Category';
import ProfileUpdate from './pages/userPages/(logged-in)/ProfileUpdate';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/useReducer';
import { getUser } from './redux/api/userAPI';
import { UserReducerInitialState } from './types/reducer-types';
import ProtectedRoute from './components/protected-route';
import UserProfile from './pages/userPages/userDashbord/UserProfile';


const ResetPasswordOtp = lazy(()=> import ('./pages/userPages/ResetPasswordOtp') ) ;
const ResetPassword = lazy(()=> import ('./pages/userPages/ResetPassword') ) ;
const ProductDetailsPage = lazy(()=> import ('./components/ProductDetailsPage') ) ;

const Login = lazy(()=> import ('./pages/userPages/Login') ) ;
const Home = lazy(()=> import ('./pages/userPages/Home') ) ; 

const Otp = lazy(()=> import ('./pages/userPages/Otp') ) ; 
const SignUp = lazy(()=> import ('./pages/userPages/SignUp') ) ; 
const MenuPage = lazy(()=> import ('./pages/userPages/MenuPage') ) ; 


const LoginPage = lazy(()=> import ('./pages/adminPages/LoginPage') ) ; 
const Customers = lazy(() => import("./pages/adminPages/Customers"));
const SignupPage = lazy(()=> import ('./pages/adminPages/SignupPage') ) ; 
const AddCategory = lazy(()=> import ('./pages/adminPages/AddCategory') ) ; 
const AddProduct = lazy(()=> import ('./pages/adminPages/AddProduct') ) ; 
const Demo = lazy(()=> import ('./pages/Demo') ) ; 

/* Admin */

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
// const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const NewCategory = lazy(() => import("./pages/admin/management/newcategory"));
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"));
const CategoryManagement = lazy(() => import("./pages/admin/management/categorymanagement"));
  const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));
    
  import Cookies from 'js-cookie'

  import {jwtDecode} from 'jwt-decode';

  import JwtPayload from './types/types';
    
    function App() {

  const {user,loading} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)

  const [token, setToken] = useState(Cookies.get('token') || '');


  

  const dispatch = useDispatch()

  useEffect(()=>{

    const token =Cookies.get("token")
   
    

    if(token){

      const user = jwtDecode(token);

      console.log(user);

      
      console.log("Logged In");
      dispatch(userExist(user))

      // i have to fix this 
      


    }else{

      onAuthStateChanged(auth,async (user)=>{
        if(user){
          console.log(user);
          const data = await getUser(user.uid)
          console.log("Logged In");
          dispatch(userExist(data.user))
        }else{
          dispatch(userNotExist())
          console.log(" Not Logged In");
        }
      })

    }


   
  },[])
  

  return loading ? (<Loader/>):(
    <>

<Router>

  <Navbar user={user}   />

  <Suspense fallback={<Loader/>} >


    
<Routes>
  {/* user */}
  {/* <Route  path='/' element={ <AuthorizeUser>  <Home  /> </AuthorizeUser> } ></Route> */}

  <Route  path='/' element={  <Home  />  } ></Route>
  {/* <Route  path='/' element={<MenuPage/>} ></Route> */}
  <Route  path='/login' element={ <ProtectedRoute isAuthenticated={user? false : true  } redirect="/" ><Login setToken={setToken} /></ProtectedRoute>} ></Route>
  {/* <Route  path='/login' element={ <Login setToken={setToken} />} ></Route> */}
  <Route  path='/signup' element={<SignUp/>} ></Route>
  <Route  path='/otp' element={<Otp/>} ></Route>
  <Route  path='/resetpasswordotp' element={<ResetPasswordOtp/>} ></Route>
  <Route  path='/forgot_password' element={<ResetPassword/>} ></Route>


<Route element={<ProtectedRoute isAuthenticated={user? true : false }  />}  >
  <Route  path='/menu' element={<MenuPage/>} ></Route>

<Route  path='user/profile' element={<UserProfile />} ></Route>
  <Route  path='/profile/Update' element={<ProfileUpdate/>} ></Route>
  <Route path="/product/:productId"   element={<ProductDetailsPage/>} />

</Route>


<Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin" ? true : false } />} >


</Route>
  <Route  path='/admin' element={<LoginPage/>} ></Route>


                                                  
  {/* Admin */}
  <Route  path='/admin/signup' element={<SignupPage/>} ></Route>
  
  <Route  path='/admin/category/add' element={<AddCategory/>} ></Route>
  <Route  path='/admin/product/add2' element={<AddProduct/>} ></Route>
 
  <Route  path='/demo' element={<Demo/>} ></Route>
  
  {/* Admin Routes */}

  
<Route
  // element={
  //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
  // }
>
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/product" element={<Products />} />
  <Route path="/admin/category" element={<Category/>} />
  <Route path="/admin/customer" element={<Customers/>} />
  <Route path="/admin/transaction" element={<Transaction />} />
  {/* Charts */}
  <Route path="/admin/chart/bar" element={<Barcharts />} />
  <Route path="/admin/chart/pie" element={<Piecharts />} />
  <Route path="/admin/chart/line" element={<Linecharts />} />
  {/* Apps */}
  <Route path="/admin/app/coupon" element={<Coupon />} />
  <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
  <Route path="/admin/app/toss" element={<Toss />} />

  {/* Management */}
  <Route path="/admin/product/new" element={<NewProduct />} />

  <Route path="/admin/category/new" element={<NewCategory />} />

  <Route path="/admin/product/:id" element={<ProductManagement />} />

  <Route path="/admin/category/:id" element={<CategoryManagement />} />

  <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
</Route>;

  
</Routes>

    
  </Suspense>

  <Toaster position='top-center' />


</Router>
     
    </>
  )
}

export default App
