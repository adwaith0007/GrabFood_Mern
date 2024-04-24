import  { useState, useEffect, useRef } from "react";
// import { AiOutlineClose } from "react-icons/ai";

const Demo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true; // Replace with your authentication logic
  const userImage = "https://example.com/user-image.jpg"; // Replace with the actual user image URL

  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen2(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

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
              <>User Logo</>
            )}
            <svg
              className={`w-5 h-5 ml-2 -mr-1 ${
                isOpen ? "transform rotate-180" : ""
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

        {isOpen && (
          <div className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
            {isLoggedIn ? (
              <>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
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

      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="dropdown-button"
            onClick={toggleDropdown2}
          >
            Options
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

        {isOpen2 && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >

            <div className="py-1" role="none">
              <button
                className="block w-full text-left text-black px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                // onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                // onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>

          // <div className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg">
          //   {isLoggedIn ? (
          //     <>
          //       <button
          //         className="block w-full text-left text-black px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900"
          //         role="menuitem"
          //         // onClick={handleCancel}
          //       >
          //         Cancel
          //       </button>
          //       <a
          //         href="#"
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //       >
          //         Profile
          //       </a>
          //       <a
          //         href="#"
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //       >
          //         Logout
          //       </a>
          //     </>
          //   ) : (
          //     <>
          //       <a
          //         href="#"
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //       >
          //         Login
          //       </a>
          //       <a
          //         href="#"
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //       >
          //         Register
          //       </a>
          //     </>
          //   )}
          // </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
