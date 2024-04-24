import  { useState, useEffect, useRef } from "react";

import {
  AiOutlineClose,
  AiOutlineMenu,
  // AiOutlineMinus,
  // AiOutlinePlus,
} from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaSignOutAlt,  FaWallet } from "react-icons/fa";

// import AddToCart from "../../pages/userPages/AddToCart";

import logo from "../../assets/logo-grabfood 1.png";
import { Link } from "react-router-dom";

import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

// import Search from "../SearchBar";
// import axios from "axios";

import api from "../../api";

// const server = import.meta.env.VITE_SERVER;

interface PropsType {
  user: User | null;
}

const Navbar = ({ user }: PropsType) => {
  const [cartItems, setCartItems] = useState([]);

  // const userId = user._id

  console.log("user:", user);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user && user._id) {
          const response = await api.get(`/cart/${user._id}`);
          console.log("Cart Items:", response.data.cart);
          setCartItems(response.data.cart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const [nav, setNav] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isOpenUser, setIsOpenUser] = useState(false);

  const dropdownRef = useRef(null);
  const isLoggedIn = true; // Replace with your authentication logic

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query
    navigate(`/menu?q=${searchQuery}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenUser(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      <nav className="bg-gray-900 h-full  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
          <div onClick={() => setNav(!nav)}>
            <AiOutlineMenu size={30} className="text-white cursor-pointer " />
          </div>
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt=""></img>
          </Link>

          <div
            className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent text-white  "
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3  rounded  md:hover:bg-transparent text-white "
                >
                  Services
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3  rounded  md:hover:bg-transparent  text-white "
                >
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="flex md:order-2 b space-x-3 gap-10 md:space-x-0 rtl:space-x-reverse">
            {/* <div className="relative hidden md:block">
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
            </div> */}

            <div className="flex justify-center items-center">
              <div className="relative text-gray-600">
                <form onSubmit={handleSearch}>
                  <input
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 mr-4"
                  >
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      
                      xmlSpace="preserve"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </form>
              </div>
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
                {/* <button onClick={() => setIsOpen((prev) => !prev)}>
                  <FaUser />
                </button> */}

                <div
                  className="relative  text-left flex "
                  ref={dropdownRef}
                >
                  <div className="flex justify-center items-center" >
                    <button
                      type="button"
                      className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      id="dropdown-button"
                      onClick={toggleDropdown}
                    >
                      {isLoggedIn ? (
                        <>
                          {/* <img
                            className="w-10 h-10 rounded-full mr-2"
                            src={user.photo}
                            alt="User Profile"
                          /> */}

                          {user?.name || user}
                        </>
                      ) : (
                        <>User Logo</>
                      )}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpenUser && (
                    <div className="absolute right-0 mt-2 w-36     ring-1 ring-black ring-opacity-5 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {isLoggedIn ? (
                        <>
                          {user.role == "admin" ? (
                            <Link
                              to="admin/dashboard"
                              onClick={() => {
                                setIsOpenUser(!isOpenUser)
                              }}
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              dashboard
                            </Link>
                          ) : (
                            <Link
                              to="user/profile"
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          )}

                          <button
                            onClick={logoutHandler}
                            className="block w-full flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
        </div>

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-20 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side drawer menu */}

        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-30 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-30 duration-300"
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
