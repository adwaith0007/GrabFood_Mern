import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import toast from "react-hot-toast"; // Add this line
import PaymentSection from "../../components/user/PaymentSection";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import api from "../../api";
const server = import.meta.env.VITE_SERVER;

const PaymentPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const orderDetails = location.state && location.state.orderDetails;

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleRazorpayPayment = async () => {
    console.log(orderDetails);

    try {
        const response = await api.post("/checkout", {
            amount: orderDetails.totalPrice,
            orderDetails,
            userId,
        });
        const order = response.data.order;

        console.log(order);

        const options = {
            key: "rzp_test_teFGtG1SVP604p", // Replace with your Razorpay API key
            amount: order.amount,
            currency: "INR",
            order_id: order.id,
            name: "GrabFood",
            description: "Payment for purchase",
            image: "https://example.com/your_logo",

            // callback_url: `${server}/api/paymentverification`,

            handler: async function (response) {
                try {
                    const verificationResponse = await axios.post(
                        `${server}/api/paymentverification`,
                        { ...response },
                        { withCredentials: true }
                    );
                    if (verificationResponse.data.success) {
                        navigate("/home");
                        toast.success("Your order is on the move");
                    } else {
                        toast.error("Payment verification failed");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Failed to verify payment. Please try again later.");
                }
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error.code);
            toast.error("Payment failed");
            navigate("/cart");
        });
        rzp1.open();
    } catch (error) {
        console.error("Error initiating payment:", error);
        toast.error("Failed to initiate payment. Please try again later.");
    }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Link to="#" className="text-2xl font-bold text-gray-800">
          checkout
        </Link>

        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              {/* Add other navigation items */}
            </ul>
          </div>
        </div>
      </div>

      {orderDetails.paymentMethod === "onlinePayment" && (
        <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
      )}

      {orderDetails.paymentMethod === "cashOnDelivery" && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
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
            <Link
              to={"/menu"}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
