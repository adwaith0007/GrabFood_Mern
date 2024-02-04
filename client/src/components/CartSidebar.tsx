import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
        <div>
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => onDecrease(item.productId)}>
            <AiOutlineMinus size={18} className="text-gray-700 cursor-pointer" />
          </button>
          <span className="text-lg">{item.quantity}</span>
          <button onClick={() => onIncrease(item.productId)}>
            <AiOutlinePlus size={18} className="text-gray-700 cursor-pointer" />
          </button>
        </div>

        <p className="text-lg font-semibold">${item.price * item.quantity}</p>
        <button onClick={() => onRemove(item.productId)}>
          <AiOutlineClose size={20} className="text-red-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

const CartSidebar = ({ cartItems, closeCart, onRemove, onIncrease, onDecrease, handleProceedToPayment }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Fetch cart items when the component mounts
    axios.get(`http://localhost:5000/api/cart/yourUserId`) // Replace with actual userId
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  // This useEffect seems to be unused. You may remove it if unnecessary.

  return (
    <div className="fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg">
      <AiOutlineClose
        onClick={closeCart}
        size={30}
        className="absolute right-4 top-6 cursor-pointer"
      />

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={onRemove}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">${totalAmount}</p>
      </div>

      <div className="p-4">
        <button
          onClick={handleProceedToPayment}
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;