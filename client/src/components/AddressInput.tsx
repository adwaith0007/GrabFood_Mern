import React, { useState } from "react";

const AddressInput = ({ setAddress, onClose }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Handle changes in input fields and update the address
  const handleAddressChange = () => {
    console.log("adress");
    
    const address = {
      street,
      city,
      state,
      zipCode,
    };
    setAddress(address);
    onClose();
  };

  return (
    <div className="bg-white p-4 z-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Enter Your Address</h2>
      <form>
        <div className="mb-2">
          <label htmlFor="street" className="block text-sm font-medium text-gray-600">
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
          <label htmlFor="city" className="block text-sm font-medium text-gray-600">
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
          <label htmlFor="state" className="block text-sm font-medium text-gray-600">
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
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-600">
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
          type="button"
          onClick={handleAddressChange}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Save Address
        </button>



      </form>
    </div>
  );
};

export default AddressInput;