

import './App.css'

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

  
</Routes>

    
  </Suspense>

  <Toaster position='top-center' />


</Router>
     
    </>
  )
}

export default App
