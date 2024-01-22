import React, { useState } from "react";

import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
// import logo from '../../public/assets/logo-grabfood 1.png'

import logo from "../assets/logo-grabfood 1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav,setNav]=useState(false)
  return (
    <div className="h-[80px] w-full ">
      <nav className="bg-white dark:bg-gray-900 h-full  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div onClick={()=>setNav(!nav)} >

          <AiOutlineMenu size={30} className="text-white cursor-pointer " />
          </div>
          <Link
            to="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt=""></img>
          </Link>
          <div className="flex md:order-2 space-x-3 gap-10 md:space-x-0 rtl:space-x-reverse">

          <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
    </div>
    <div className="flex justify-center" >
      <button>
        <BsCart3 size={20} className="text-white" />
      </button>
    </div>


    <Link
                  to="/">

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              Login     
            </button>
              </Link>

              <Link
                  to="/signup">


            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              Sign Up   
            </button>
              </Link>
           
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0" ></div> : ''  }
        

          {/* Side drawer menu */}

          <div className={nav ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300":"fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"} >
            <AiOutlineClose onClick={()=>setNav(!nav)} size={30} className="absolute right-4 top-6 cursor-pointer"/>
            <img className="p-4" src={logo} alt=""></img>

            <nav>
              <ul className="flex flex-col p-4 text-gray-800" >
                <li className="text-xl py-4 flex" >
                  <TbTruckDelivery size={25} className="mr-4" />Orders
                </li>
                <li className="text-xl py-4 flex" >
                  <MdFavorite size={25} className="mr-4" />Favorites
                </li><li className="text-xl py-4 flex" >
                  <FaWallet size={25} className="mr-4" />Wallet
                </li><li className="text-xl py-4 flex" >
                  <MdHelp size={25} className="mr-4" />Help
                </li><li className="text-xl py-4 flex" >
                  <TbTruckDelivery size={25} className="mr-4" />
                </li><li className="text-xl py-4 flex" >
                  <TbTruckDelivery size={25} className="mr-4" />Orders
                </li><li className="text-xl py-4 flex" >
                  <TbTruckDelivery size={25} className="mr-4" />Orders
                </li>
              </ul>
            </nav>
          </div>

        




      </nav>



      





    </div>
  );
};

export default Navbar;
