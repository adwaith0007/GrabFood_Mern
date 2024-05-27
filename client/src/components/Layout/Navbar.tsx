import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";

import {
  AiOutlineClose,
  AiOutlineMenu,
  // AiOutlineMenu,
  // AiOutlineMinus,
  // AiOutlinePlus,
} from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { FaUser, FaWallet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userNotExist } from "../../redux/reducer/useReducer";
// import AddToCart from "../../pages/userPages/AddToCart";

import logo from "../../assets/logo/logo-grabfood.png";

// import mob_logo1 from "../../assets/logo/logo_mob.png";

// import mob_logo2 from "../../assets/logo/logo_mob2.png";

import { Link } from "react-router-dom";

import {
  // RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";

import { useSelector } from "react-redux";

import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
// import { useSelector } from 'react-redux';
import defimg from "../../assets/profile.png";
// import { UserReducerInitialState } from "../../types/reducer-types";
import {updateUserPhoto} from "../../../src/redux/reducer/useReducer";
import api from "../../../src/api";
interface PropsType {
  user: User | null;
}

const selectUniqueItemCount = (state) => state.cart.items.length;

const Navbar = ({ user }: PropsType) => {
  const uniqueItemCount = useSelector(selectUniqueItemCount);

  

  const userId = user?._id;
  const dispatch = useDispatch();

  
 

  const [nav, setNav] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isOpenUser, setIsOpenUser] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const server = import.meta.env.VITE_SERVER;

  

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        const response = await api.get(`/user/get/${userId}`);
        if (response && response.data) {
         
          dispatch(updateUserPhoto(response.data.data.profilePicture));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      
      }
    };

    fetchUserData();
  }, [userId]);

  

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/menu?q=${searchQuery}`);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpenUser(false);
  //     }
  //   };

  //   window.addEventListener("click", handleClickOutside);

  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const toggleDropdown = () => {
    setIsOpenUser(!isOpenUser);
  };

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);

      Cookie.remove("token");

      toast.success("Sign Out Successfully");
      setIsOpenUser(false);

      dispatch(userNotExist());

      navigate("/login");
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  // const image =
  //   typeof user?.photo === "string"
  //     ? `${server}/${user.photo.replace(/ /g, "%20")}`
  //     : ` ${userData?.photo} || ${defimg} `;

  const image =
    typeof user?.photo === "string"
      ? `${server}/${user.photo.replace(/ /g, "%20")}`
      : defimg;

  return (
    <div className="h-[80px] w-full ">
      <nav className="bg-gray-900 h-full  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="  lg:max-w-screen-xl  flex flex-wrap items-center  justify-between mx-auto p-4">
          <div onClick={() => setNav(!nav)}>
            <AiOutlineMenu size={30} className="text-white cursor-pointer " />
          </div>
          <Link
            to="/home"
            className=" hidden md:flex items-center  space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt=""></img>
          </Link>

          {user?.role == "user" && (
            <div
              className="items-center md:hidden  justify-between hidden w-full lg:flex lg:w-auto "
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/home"
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
              </ul>
            </div>
          )}

          <div className="flex flex-row items-center justify-between  b space-x-3 gap-14 md:space-x-0 ">
            {user?.role == "user" && (
              <div className="hidden  lg:flex justify-center items-center">
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
            )}

            {user?.role == "user" ? (
              <Link className="hidden md:block" to="/cart">
                <div className="relative py-2   ">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {uniqueItemCount}
                    </p>
                  </div>
                  <BsCart3
                    size={20}
                    className="text-white file: mt-4 h-6 w-6 "
                  />
                </div>
              </Link>
            ) : (
              <></>
            )}

            <div>
              <div className="relative  text-left flex " ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex justify-center items-center w-9 h-9 text-sm bg-gray-800  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  type="button"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className=" w-full h-full object-cover  rounded-full"
                    src={image}
                    alt="user photo"
                  />
                </button>

                {isOpenUser && (
                  <div className="absolute z-10 mt-11 lg:w-36 right-0 lg:right-5   ring-1 ring-black ring-opacity-5 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {user ? (
                      <>
                        <div className="z-40  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{user?.name}</div>
                          </div>

                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownUserAvatarButton"
                          >
                            {user?.role == "admin" ? (
                              <li>
                                <Link
                                  to={"admin/dashboard"}
                                  onClick={() => setIsOpenUser(!isOpenUser)}
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Dashboard
                                </Link>
                              </li>
                            ) : (
                              <>
                                <li>
                                  <Link
                                    to={"user/profile"}
                                    onClick={() => setIsOpenUser(!isOpenUser)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Profile
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to={"/cart"}
                                    onClick={() => setIsOpenUser(!isOpenUser)}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Cart
                                  </Link>
                                </li>
                              </>
                            )}

                            <li>
                              <button
                                onClick={logoutHandler}
                                className=" w-full flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Sign out
                              </button>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="z-40  bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownUserAvatarButton"
                        >
                          <li>
                            <Link
                              to={"/login"}
                              onClick={() => setIsOpenUser(!isOpenUser)}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Login
                            </Link>
                          </li>

                          <li>
                            <Link
                              to={"/signup"}
                              onClick={() => setIsOpenUser(!isOpenUser)}
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign Up
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
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

        {/* <UserSidebar/> */}

        <div
          className={
            nav
              ? "fixed  md:block top-0 left-0 w-[300px] h-screen bg-white z-40 duration-300"
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
              <Link
                to={"/home"}
                onClick={() => setNav(!nav)}
                className="text-xl py-4 flex"
              >
                <RiDashboardFill size={25} className="mr-4" />
                Home
              </Link>
              <Link
                to={"/menu"}
                onClick={() => setNav(!nav)}
                className="text-xl py-4 flex"
              >
                <RiShoppingBag3Fill size={25} className="mr-4" />
                Menu
              </Link>
              <Link
                to={"/user/profile"}
                onClick={() => setNav(!nav)}
                className="text-xl py-4 flex"
              >
                <FaUser size={25} className="mr-4" />
                User Profile
              </Link>
              <Link to={"/user/wallet"} className="text-xl py-4 flex">
                <FaWallet size={25} className="mr-4" />
                My Wallet
              </Link>

              <Link to={"/user/favourites"} className="text-xl py-4 flex">
                <MdFavorite size={25} className="mr-4" />
                Favourites
              </Link>

              <Link to={"/user/orders"} className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
                My Orders
              </Link>
            </ul>
          </nav>
        </div>
      </nav>

      {/* {showSearch && <Search setShowSearch={setShowSearch} />} */}
    </div>
  );
};

export default Navbar;
