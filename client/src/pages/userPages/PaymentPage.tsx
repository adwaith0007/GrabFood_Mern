import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import toast from "react-hot-toast"; // Add this line
// import PaymentSection from "../../components/user/PaymentSection";
import axios from "axios";
import logo from "../../assets/logo-grabfood 1.png";
import { useNavigate } from "react-router-dom";

import api from "../../api";
// import OrderSuccess from "./OrderSuccess";
const server = import.meta.env.VITE_SERVER;

const PaymentPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    // const [paymentMethod, setPaymentMethod] = useState("");

    const [orderSuccess, setOrderSuccess ] = useState(false);
    
   

  const userId = user._id;

  const navigate = useNavigate();

  const [card, setCard] = useState(true);

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const checkoutData = location.state && location.state.checkoutData;

  const reorderData = location.state && location.state.reorderData;

  console.log("reOrderId:", reorderData)


  const currentOrder =  checkoutData || reorderData

  useEffect(() => {
    setLoading(false);
  }, []);


  const getCurrentDateTime = () => {
    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
  };

  
  const handleWalletPayment = async (amount) => {
    try {
      const response = await api.post("/wallet/deduct", { userId, amount });
  
      if (!response.data.success) {
        return toast.error(response.data.message);
      }

      const orderDetails ={
        userId:currentOrder.userId,
        products: currentOrder.products,
        address: currentOrder.address,
        discountAmount:currentOrder.discountAmount,
        couponCode:currentOrder.couponCode,
        paymentMethod:'Wallet',
        orderDate: getCurrentDateTime(),
        totalPrice :currentOrder.totalPrice,
        
        preOrderId:currentOrder?._id,
        preOrderStatus:currentOrder?.orderStatus
      }
  
      api
        .post(`/order/wallet`,
          {
            
            orderDetails,userId
          },
          
        )
        .then((res) => {
          if (res.data.success) {
            // toast.success(res.data.message);
            // navigate("/home");
            setOrderSuccess(true);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while processing payment via wallet", error);
    }
  };


  
  const handleCOD = async () => {
    try {

      if(currentOrder.totalPrice>1000){
        return toast.error("COD should be less than Rs 1000");
      }
      

      const orderDetails ={
        userId:currentOrder.userId,
        products: currentOrder.products,
        address: currentOrder.address,
        discountAmount:currentOrder.discountAmount,
        couponCode:currentOrder.couponCode,
        paymentMethod:'COD',
        orderDate: getCurrentDateTime(),
        totalPrice :currentOrder.totalPrice,

        preOrderId:currentOrder?._id,
      }
  
      api
        .post(`/order/cod`,
          {
            
            orderDetails,userId
          },
          
        )
        .then((res) => {
          if (res.data.success) {
            // toast.success(res.data.message);
            // navigate("/home");
            setOrderSuccess(true);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while processing payment via wallet", error);
    }
  };



  const handleRazorpayPayment = async () => {
    
    const orderDetails ={
      userId:currentOrder.userId,
      products: currentOrder.products,
      address: currentOrder.address,
      discountAmount:currentOrder.discountAmount,
      couponCode:currentOrder.couponCode,
      paymentMethod:'onlinePayment',
      orderDate: getCurrentDateTime(),
      totalPrice :currentOrder.totalPrice,
      preOrderId:currentOrder?._id,
    }
    console.log('orderDetails',orderDetails);
    
    try {
        const response = await api.post("/checkout", {
            amount: orderDetails.totalPrice,
            orderDetails,
            userId,
        });
        const order = response.data.order;

        console.log(order);

        const options = {
            key: "rzp_test_teFGtG1SVP604p", 
            amount: order.amount,
            currency: "INR",
            order_id: order.id,
            name: "GrabFood",
            description: "Payment for purchase",
            image: {logo},

            // callback_url: `${server}/api/paymentverification`,

            handler: async function (response) {
              console.log('Response data:', response);
                try {
                    const verificationResponse = await axios.post(
                        `${server}/api/paymentverification`,{ ...response , orderDetails });
                    if (verificationResponse.data.success) {
                         setOrderSuccess(true);
                        // navigate("/home");
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

        //@ts-ignore
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {

          console.log(response)

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
        <a href="#" className="text-2xl font-bold text-gray-800">
          Payment
        </a>

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
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
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
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-900">Payment</span>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div>
      <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>


      <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          <div>
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
              <img
                className="rounded-t shadow-lg"
                src="https://apploye.com/blog/content/images/2022/07/payment-methods-for-freelancers.png"
                width="460"
                height="180"
                alt="Pay background"
              />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
              <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                <div className="text-center mb-6 pt-4">
                  <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">
                    Select Payment Method
                  </h1>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative flex w-full p-1 bg-gray-50 rounded">
                    <span
                      className="absolute inset-0 m-1 pointer-events-none"
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                          card ? "translate-x-0" : "translate-x-full"
                        }`}
                      ></span>
                    </span>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                      onClick={() => setCard(true)}
                    >
                      Online Payment
                    </button>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                      onClick={() => setCard(false)}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
                <div style={{ display: card ? "block" : "none" }}>
                  <div className="space-y-4">
                    <div>
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={() => {
                          handleWalletPayment(currentOrder.totalPrice);
                        }}
                      >
                        Pay ₹ {currentOrder.totalPrice} via wallet
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="mb-4">
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        // onClick={() => { handleOnlinePayment(total); }}

                        onClick={handleRazorpayPayment}
                      >
                        Pay ₹ {currentOrder.totalPrice} via Razorpay
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Youl be charged $253, including $48 for VAT in Italy
                    </div>
                  </div>
                </div>
                <div style={{ display: !card ? "block" : "none" }}>
                  <div>
                    <div className="mb-4">
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full hover:bg-indigo-500 bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={handleCOD}
                      >
                        Pay - ₹ {currentOrder.totalPrice}
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Youll be charged $253, including $48 for VAT if you are
                      outside India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      </div>


      {/* <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer  hidden"
                id="radio_1"
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                // checked={paymentMethod === "cashOnDelivery"}
                // onChange={handlePaymentChange}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash On Delivery</span>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="paymentMethod"
                value="onlinePayment"
                // checked={paymentMethod === "onlinePayment"}
                // onChange={handlePaymentChange}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Online Payment</span>
                </div>
              </label>
            </div>
          </form>

      {orderDetails.paymentMethod === "onlinePayment" && (
        <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
      )} */}

      {orderSuccess && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm  text-center">
            <div className=" mb-6">
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
              Thank you for your order. We have received your payment and your order is on its way.
            </p>



            <div className="mt-3" >
            <Link
              to={"/menu"}
              className="mt-4 bg-blue-500 text-white  px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
              Continue Shopping
            </Link>
                </div>

          </div>
          
        </div>
      )}


    </div>
  );
};

export default PaymentPage;
