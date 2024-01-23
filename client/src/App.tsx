

import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy,Suspense } from 'react'; 
import { useEffect } from 'react';
import { AuthorizeUser } from './middleware/auth';
import { Toaster } from 'react-hot-toast';

import Loader from './components/loader';
import Navbar from './components/Navbar';

const Login = lazy(()=> import ('./pages/userPages/Login') ) ;
const Home = lazy(()=> import ('./pages/userPages/Home') ) ; 

const Otp = lazy(()=> import ('./pages/userPages/Otp') ) ; 
const SignUp = lazy(()=> import ('./pages/userPages/SignUp') ) ; 

const MenuPage = lazy(()=> import ('./pages/userPages/MenuPage') ) ; 
const LoginPage = lazy(()=> import ('./pages/adminPages/LoginPage') ) ; 
const SignupPage = lazy(()=> import ('./pages/adminPages/SignupPage') ) ; 
const AddCategory = lazy(()=> import ('./pages/adminPages/AddCategory') ) ; 
const AddItem = lazy(()=> import ('./pages/adminPages/AddItems') ) ; 
const Demo = lazy(()=> import ('./pages/Demo') ) ; 

/* Admin */

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);


function App() {
  

  return (
    <>

<Router>

  <Navbar/>

  <Suspense fallback={<Loader/>} >


    
<Routes>
  {/* user */}
  <Route  path='/home' element={ <AuthorizeUser>  <Home  /> </AuthorizeUser> } ></Route>
  <Route  path='/menu' element={<MenuPage/>} ></Route>
  <Route  path='/' element={<Login/>} ></Route>
  <Route  path='/signup' element={<SignUp/>} ></Route>
  <Route  path='/otp' element={<Otp/>} ></Route>

                                                  
  {/* Admin */}
  <Route  path='/admin' element={<LoginPage/>} ></Route>
  <Route  path='/admin/signup' element={<SignupPage/>} ></Route>
  <Route  path='/admin/category/add' element={<AddCategory/>} ></Route>
  <Route  path='/admin/item/add' element={<AddItem/>} ></Route>
 
  <Route  path='/admin/demo' element={<Demo/>} ></Route>
  
  {/* Admin Routes */}

  
<Route
  // element={
  //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
  // }
>
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/product" element={<Products />} />
  <Route path="/admin/category" element={<Products />} />
  <Route path="/admin/customer" element={<Customers />} />
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

  <Route path="/admin/product/:id" element={<ProductManagement />} />

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
