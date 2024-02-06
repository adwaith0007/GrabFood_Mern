import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressInput from "./AddressInput";
import CartItem from "./CartItem";
import { AiOutlineClose } from "react-icons/ai";

const PaymentAddressInputPopup = ({ cartItems, userId, onClose }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressInput, setShowAddressInput] = useState(false);

  useEffect(() => {
    // Fetch user addresses when the component mounts
    if (userId) {
      axios.get(`http://localhost:5000/api/user/${userId}/addresses`)
        .then((response) => {
          setAddresses(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const handleProceedToPayment = () => {
    setShowAddressInput(false);
  };

  const handleAddAddress = () => {
    setShowAddressInput(true);
  };

  const handleAddressAdded = () => {
    // Refresh the addresses after adding a new address
    if (userId) {
      axios.get(`http://localhost:5000/api/user/${userId}/addresses`)
        .then((response) => {
          setAddresses(response.data);
          setShowAddressInput(false);
        })
        .catch((error) => {
          console.error(error);
        });
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

        {showAddressInput ? (
          <AddressInput
            userId={userId}
            setAddress={handleAddressAdded}
            onClose={() => setShowAddressInput(false)}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Proceed to Payment</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Select Address:</label>
              <select
                value={selectedAddress ? selectedAddress._id : ""}
                onChange={(e) => {
                  const selected = addresses.find((address) => address._id === e.target.value);
                  setSelectedAddress(selected);
                }}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="" disabled>Select an address</option>
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddAddress}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
            >
              Add Address
            </button>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onRemove={() => {}}
                  onIncrease={() => {}}
                  onDecrease={() => {}}
                />
              ))}
              <p className="text-lg font-semibold mt-2">Total Amount: ₹{getTotalAmount()}</p>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );

  function getTotalAmount() {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
};

export default PaymentAddressInputPopup;