import React, { useState } from "react";

import { AiOutlineClose, AiOutlineMenu, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";

import AddToCart from "../pages/userPages/AddToCart";
// import logo from '../../public/assets/logo-grabfood 1.png'

import logo from "../assets/logo-grabfood 1.png";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import {User} from "../types/types"

const user = { _id: "ad", role: "admin" };





// const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
//   return (
//     <div className="flex items-center justify-between p-4 border-b">
//       <div className="flex items-center space-x-4">
//         <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
//         <div>
//           <p className="text-lg font-semibold">{item.name}</p>
//           <p className="text-gray-500">Quantity: {item.quantity}</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <button onClick={() => onDecrease(item.id)}>
//             <AiOutlineMinus size={18} className="text-gray-700 cursor-pointer" />
//           </button>
//           <span className="text-lg">{item.quantity}</span>
//           <button onClick={() => onIncrease(item.id)}>
//             <AiOutlinePlus size={18} className="text-gray-700 cursor-pointer" />
//           </button>
//         </div>

//         <p className="text-lg font-semibold">${item.price * item.quantity}</p>
//         <button onClick={() => onRemove(item.id)}>
//           <AiOutlineClose size={20} className="text-red-500 cursor-pointer" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const CartSidebar = ({ cartItems, closeCart, onRemove, onIncrease, onDecrease, onProceedToPayment }) => {
//   const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg">
//       <AiOutlineClose
//         onClick={closeCart}
//         size={30}
//         className="absolute right-4 top-6 cursor-pointer"
//       />

//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//         {cartItems.map((item) => (
//           <CartItem
//             key={item.id}
//             item={item}
//             onRemove={onRemove}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//           />
//         ))}
//       </div>

//       <div className="flex justify-between items-center p-4 border-t">
//         <p className="text-lg font-semibold">Total:</p>
//         <p className="text-lg font-semibold">${totalAmount}</p>
//       </div>

//       <div className="p-4">
//         <button
//           onClick={onProceedToPayment}
//           className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

interface PropsType{
  user: User | null
}

const Navbar = ({user}:PropsType) => {
  const [nav, setNav] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", quantity: 2, price: 20 },
    { id: 2, name: "Product 2", quantity: 1, price: 15 },
  ]); // Assume you have a state for cart items

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="h-[80px] w-full ">
      <nav className="bg-white dark:bg-gray-900 h-full  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div onClick={() => setNav(!nav)}>
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
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <div className="flex justify-center">
              <button onClick={openCart}>
                <BsCart3 size={20} className="text-white" />
              </button>
            </div>

            {user?._id ? (
              <>
                <button onClick={() => setIsOpen((prev) => !prev)}>
                  <FaUser />
                </button>
                <dialog open={isOpen}>
                  <div>
                    {user.role === "admin" && (
                      <Link to="/admin/dashboard">Admin</Link>
                    )}

                    {user.role === "user" && <Link to="/orders">Orders</Link>}

                    <button>
                      <FaSignOutAlt />
                    </button>
                  </div>
                </dialog>
              </>
            ) : (
              <Link to="/">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </Link>
            )}

            <Link to="/signup">
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

        {/* Cart Sidebar */}
        {/* {isCartOpen && (
          <AddToCart cartItems={cartItems} closeCart={closeCart} />
        )} */}

        {isCartOpen ? (
          // <AddToCart cartItems={cartItems} closeCart={closeCart} />
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : ("") }



{isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          closeCart={closeCart}
          onRemove={(itemId) => {
            const updatedCart = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedCart);
          }}
          onIncrease={(itemId) => {
            const updatedCart = cartItems.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
          }}
          onDecrease={(itemId) => {
            const updatedCart = cartItems.map((item) =>
              item.id === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            setCartItems(updatedCart);
          }}
          onProceedToPayment={() => {
            // Implement your logic for proceeding to payment
            // This can include routing to a payment page or any other relevant action
            console.log("Proceeding to payment...");
          }}
        />
      )}
{/* 
{isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          closeCart={closeCart}
          onRemove={(itemId) => {
            const updatedCart = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedCart);
          }}
          onProceedToPayment={() => {
            // Implement your logic for proceeding to payment
            // This can include routing to a payment page or any other relevant action
            console.log("Proceeding to payment...");
          }}
        />
      )} this is good */}


          {/* Side drawer menu */}

        {/* <div
          className={
            isCartOpen
              ? "fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setIsCartOpen(!isCartOpen)}
            size={30}
            className="absolute right-4 top-6 cursor-pointer"
          />
          

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
        </div> */}



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
    </div>
  );
};

export default Navbar;
