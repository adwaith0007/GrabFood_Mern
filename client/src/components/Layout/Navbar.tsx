import React, { useEffect, useState } from "react";

import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";

import AddToCart from "../../pages/userPages/AddToCart";
// import logo from '../../public/assets/logo-grabfood 1.png'

import logo from "../../assets/logo-grabfood 1.png";
import { Link } from "react-router-dom";

import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

import Cookie from "js-cookie";

import Search from "../Search";
import axios from "axios";

interface PropsType {
  user: User | null;
}

const Navbar = ({ user }: PropsType) => {

  

  const [cartItems, setCartItems] = useState([]);


  // const userId = user._id

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
          console.log("Cart Items:", response.data.cart);
          setCartItems(response.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, [user]);
  

  




  

  const [nav, setNav] = useState<boolean>(false);
 
 

  const [showSearch, setShowSearch] = useState(false);



  const [isOpenUser, setIsOpenUser] = useState(false);
  const isLoggedIn = true; // Replace with your authentication logic

  const toggleDropdown = () => {
    setIsOpenUser(!isOpenUser);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  

  const logoutHandler = async () => {
    try {
      await signOut(auth);

      Cookie.remove("token");

      toast.success("Sign Out Successfully");

      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <div className="h-[80px] w-full ">
      <nav className="bg-white dark:bg-gray-900 h-full  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div onClick={() => setNav(!nav)}>
            <AiOutlineMenu size={30} className="text-white cursor-pointer " />
          </div>
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt=""></img>
          </Link>
          <div className="flex md:order-2 space-x-3 gap-10 md:space-x-0 rtl:space-x-reverse">
            <div className="relative hidden md:block">
              <button
                className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                onClick={() => setShowSearch(false)}
              >
                <span className="sr-only">Search icon</span>
              </button>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            

            

            <Link className="" to="/cart">
              <div className="relative py-2   ">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {cartItems.length}
                  </p>
                </div>
                <BsCart3 size={20} className="text-white file: mt-4 h-6 w-6 " />
              </div>
            </Link>

            {user ? (
              <>
                <button onClick={() => setIsOpen((prev) => !prev)}>
                  <FaUser />
                </button>

                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="inline-flex justify-center items-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    >
                      {isLoggedIn ? (
                        <>
                          <img
                            className="w-10 h-10 rounded-full mr-2"
                            src={user.photo}
                            alt="User Profile"
                          />

                          {user?.name || user}
                        </>
                      ) : (
                        <>User Logo</>
                      )}
                      <svg
                        className={`w-5 h-5 ml-2 -mr-1 ${
                          isOpenUser ? "transform rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {isOpenUser && (
                    <div className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {isLoggedIn ? (
                        <>
                          <Link
                            to="user/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={logoutHandler}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Register
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <dialog open={isOpen}>
                  <div>
                    {user.role === "admin" && (
                      <Link to="/admin/dashboard">Admin</Link>
                    )}

                    {user.role === "user" && <Link to="/orders">Orders</Link>}

                    <button onClick={logoutHandler}>
                      <FaSignOutAlt />
                    </button>
                  </div>
                </dialog>
              </>
            ) : (
              <div className="gap-10 flex ">
                <div>
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login
                    </button>
                  </Link>
                </div>

                <div>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            )}
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
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side drawer menu */}

        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-6 cursor-pointer"
          />
          <img className="p-4" src={logo} alt=""></img>

          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
                Orders
              </li>
              <li className="text-xl py-4 flex">
                <MdFavorite size={25} className="mr-4" />
                Favorites
              </li>
              <li className="text-xl py-4 flex">
                <FaWallet size={25} className="mr-4" />
                Wallet
              </li>
              <li className="text-xl py-4 flex">
                <MdHelp size={25} className="mr-4" />
                Help
              </li>
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
              </li>
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
                Orders
              </li>
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
                Orders
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      {/* {showSearch && <Search setShowSearch={setShowSearch} />} */}

      
    </div>
  );
};

export default Navbar;
