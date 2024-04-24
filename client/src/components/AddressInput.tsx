import  { useState } from "react";
// import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import api from '../api'

const AddressInput = ({ userId, setAddress, onClose }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Handle changes in input fields and update the address
  const handleAddressChange = async (e) => {
    e.preventDefault();
    
    const newAddress = {
      street,
      city,
      state,
      zipCode,
    };

    try {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      await api.put(`/addaddresses/${userId}`, {
        userId: userId,
        address: newAddress,
      });

      setAddress(newAddress);
      // onClose();
    } catch (error) {
      console.error(error);
      // Handle error accordingly
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 z-50 rounded-md shadow-md w-[400px]">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Enter Your Address </h2>
        <form onSubmit={handleAddressChange} >
          <div className="mb-2">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600"
            >
              Street:
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              onBlur={handleAddressChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={handleAddressChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State:
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              onBlur={handleAddressChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-600"
            >
              ZIP Code:
            </label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onBlur={handleAddressChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            
            className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressInput;
