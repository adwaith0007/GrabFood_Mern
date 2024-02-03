import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Demo = () => {
  // const [selectedImages, setSelectedImages] = useState([]);

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   setSelectedImages((prevImages) => [...prevImages, ...files]);
  // };

  // const handleRemoveImage = (index) => {
  //   setSelectedImages((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages.splice(index, 1);
  //     return updatedImages;
  //   });
  // };
  return (
    <div>
      <h1>h1</h1>

<div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>

    <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-4 transform translate-x-full transition-transform duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <p>Your cart is empty.</p>
      {/* {true? (
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
      )} */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
        // onClick={closeCart}
      >
        Close Cart
      </button>
    </div>
    </div>
  )
}

export default Demo