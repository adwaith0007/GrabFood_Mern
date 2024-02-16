import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Demo = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true; // Replace with your authentication logic
  const userImage = 'https://example.com/user-image.jpg'; // Replace with the actual user image URL

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    
      

    <div className="bg-gray-200 p-8">
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {isLoggedIn ? (
            <>
              <img
                className="w-6 h-6 rounded-full mr-2"
                src={userImage}
                alt="User Profile"
              />
              User Name
            </>
          ) : (
            <>
              User Logo
            </>
          )}
          <svg
            className={`w-5 h-5 ml-2 -mr-1 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {isLoggedIn ? (
            <>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Login
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Register
              </a>
            </>
          )}
        </div>
      )}
    </div>
  </div>


  )  
}

export default Demo