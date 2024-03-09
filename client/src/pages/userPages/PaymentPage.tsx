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
    <div>
      {/* Your existing JSX code here */}


      {orderDetails.paymentMethod === "cashOnDelivery"?

     

      <div className="success-animation">
        <svg
          className="checkmark"
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

: <div>
  <PaymentSection/>
</div> }
    </div>
  );
};

export default PaymentPage;