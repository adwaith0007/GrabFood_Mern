import  { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const UpdateAddressInput = ({ userId, onhandleUpdateAddress,  currentAddress, onClose }) => {
  const [street, setStreet] = useState(currentAddress.street || "");
  const [city, setCity] = useState(currentAddress.city || "");
  const [state, setState] = useState(currentAddress.state || "");
  const [zipCode, setZipCode] = useState(currentAddress.zipCode || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddressChange = async (e) => {
    e.preventDefault();

    const updatedAddress = {
      street,
      city,
      state,
      zipCode,
    };

    try {
      setLoading(true);

      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      await axios.put(`http://localhost:5000/api/user/${userId}/addresses/${currentAddress._id}`, {
        userId,
        addressId: currentAddress._id,
        address: updatedAddress,
      });

      onhandleUpdateAddress(updatedAddress);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`http://localhost:5000/api/user/${userId}/addresses/${currentAddress._id}`);

      // handleDeleteAddress(currentAddress._id);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Failed to delete address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 z-50 rounded-md shadow-md w-[400px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Update Your Address </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleAddressChange}>
          {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
          <div className="mb-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-600">
              Street:
            </label>
            <input
              type="text"
              id="street"
              placeholder={currentAddress.street}
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
              placeholder={currentAddress.city}
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
              placeholder={currentAddress.state}
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
              placeholder={currentAddress.zipCode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onBlur={handleAddressChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="mt-4 p-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Address"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="mt-4 p-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressInput;
