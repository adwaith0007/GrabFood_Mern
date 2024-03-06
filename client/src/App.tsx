

import './App.scss'

import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import { lazy,Suspense, useState } from 'react'; 
import { useEffect } from 'react';
import { AuthorizeUser } from './middleware/auth';
import { Toaster } from 'react-hot-toast';

import Loader from './components/loader';
import Navbar from './components/Layout/Navbar';
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



const Demo = lazy(()=> import ('./pages/Demo') ) ; 

/* Admin */


// const Customers = lazy(() => import("./pages/admin/customers"));


  const CartPage = lazy(() => import("./pages/userPages/CartPage"));

  const CheckoutPage = lazy(() => import("./pages/userPages/CheckoutPage"));
    
  import Cookies from 'js-cookie'

  import {jwtDecode} from 'jwt-decode';

  import JwtPayload from './types/types';
import OrderPage from './pages/userPages/userDashbord/OrderPage';
import ManageAddressPage from './pages/userPages/userDashbord/ManageAddressPage';
import FavouritesPage from './pages/userPages/userDashbord/FavouritesPage';
import MyWalletPage from './pages/userPages/userDashbord/MyWalletPage';
import AdminRoutes from './Routes/AdminRoutes';

    
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
  <Route  path='/cart' element={<CartPage/>} ></Route>
  <Route  path='/checkout' element={<CheckoutPage/>} ></Route>

<Route  path='user/profile' element={<UserProfile />} ></Route>
<Route  path='user/orders' element={<OrderPage/>} ></Route>
<Route  path='user/address' element={<ManageAddressPage/>} ></Route>
<Route  path='user/favourites' element={<FavouritesPage/>} ></Route>
<Route  path='user/wallet' element={<MyWalletPage/>} ></Route>

  <Route  path='/profile/Update' element={<ProfileUpdate/>} ></Route>
  <Route path="/product/:productId"   element={<ProductDetailsPage/>} />


</Route>


<Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin" ? true : false } />} >


</Route>
  


                                                  
  {/* Admin */}
  
 
  <Route  path='/demo' element={<Demo/>} ></Route>
  
  {/* Admin Routes */}

  
<Route
  // element={
  //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
  // }
>

<Route path="/admin/*" element={<AdminRoutes />} />
  
  
 
</Route>;

  
</Routes>

    
  </Suspense>

  <Toaster position='top-center' />


</Router>
     
    </>
  )
}

export default App
