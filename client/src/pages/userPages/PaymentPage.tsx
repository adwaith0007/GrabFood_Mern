import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import toast from 'react-hot-toast'; // Add this line
import PaymentSection from "../../components/user/PaymentSection";

const PaymentPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const orderDetails = location.state && location.state.orderDetails;

  // const handlePlaceOrder = async () => {
  //   try {
  //     if (orderDetails.paymentMethod === "cashOnDelivery") {
  //       const response = await axios.post(
  //         'http://localhost:5000/api/placeOrder',
  //         orderDetails
  //       );

  //       toast.success('Order placed successfully!');
  //       console.log('Order placed successfully:', response.data.order);
  //       // Assuming you have a state for setorderSuccessPopUp
  //       // setorderSuccessPopUp(true);
  //     }
  //   } catch (error) {
  //     toast.error('Failed to place order. Please try again later.');
  //     console.error('Error placing order:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Check if orderDetails is present and the payment method is "cashOnDelivery"
  //   if (orderDetails && orderDetails.paymentMethod === "cashOnDelivery") {
  //     handlePlaceOrder();
  //   }
  // }, [orderDetails]);

  useEffect(() => {
    // Assuming you want to load user orders here
    // Add your logic to fetch user orders
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      {orderDetails.paymentMethod === 'cashOnDelivery' ? (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm text-center">
          <div className="success-animation mb-6">
            <svg
              className="checkmark w-16 h-16 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            Order Successful!
          </p>
          <p className="text-gray-600 mt-2">
            {/* Thank you for your order. We have received your payment and your order is on its way. */}
          </p>
          <Link to={"/menu"}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            // onClick={handleContinueShopping}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <PaymentSection />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;