import  { useEffect, useState } from "react";
import CheckoutOrderSummary from "../../components/user/CheckoutOrderSummary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {  faLocationDot } from "@fortawesome/free-solid-svg-icons";

import {  useNavigate } from "react-router-dom";
import AddressInput from "../../components/AddressInput";
// import axios from "axios";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import ChooseAddress from "../../components/user/ChooseAddress";
import UpdateAddressInput from "../../components/user/UpdateAddressInput";
import toast from "react-hot-toast";

import api from "../../api";
import CouponCard from "../../components/user/CouponCard";
// const server = import.meta.env.VITE_SERVER;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const [addressTab, setAddressTab] = useState(false);
  const [updateAddressTab, setUpdateAddressTab] = useState(false);
  const [chooseaddressTab, setChooseaddressTab] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<any>();

 

  const [cartItems, setCartItems] = useState();
  // const [paymentMethod, setPaymentMethod] = useState("");

  // const handlePaymentChange = (event) => {
  //   setPaymentMethod(event.target.value);
  // };

  useEffect(() => {
    if (userId) {
      api
        .get(`/user/${userId}/addresses`)

        .then((response) => {
          setSelectedAddress(response?.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  


  }, [userId]);

  const handleAddressAdded = () => {
    if (userId) {
      api
        .get(`/user/${userId}/addresses`)
        .then((response) => {
          setSelectedAddress(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  console.log(selectedAddress);

  const handleUpdateAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleOrderCartItem = (item) => {
    setCartItems(item);
  };

  // const getCurrentDateTime = () => {
  //   const currentDate = new Date();

  //   const month = currentDate.getMonth() + 1;
  //   const day = currentDate.getDate();
  //   const year = currentDate.getFullYear();
  //   let hours = currentDate.getHours();
  //   const minutes = currentDate.getMinutes();

  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12;

  //   const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

  //   return formattedDateTime;
  // };

  const handleOnPlaceOrder:any = async (totalAmount,discountAmount,couponCode) => {
    console.log( 'total', totalAmount);

   

    if (!userId || !cartItems || !selectedAddress ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const checkoutData:any = {
        userId,
        products: cartItems,
        address: selectedAddress,
        discountAmount,
        couponCode,
        // paymentMethod,
        // orderDate: getCurrentDateTime(),
        totalPrice :totalAmount,
      };

      console.log( 'checkoutData', checkoutData);

      navigate("/payment", { state: { checkoutData } });

      // if (orderDetails.paymentMethod === "cashOnDelivery") {
      //   const response = await api.post("/placeOrder", orderDetails);

      //   if (response.status === 201) {
      //     toast.success("Order placed successfully!");
      //     console.log("Order placed successfully:", response.data.order);

      //     await api.post("/deleteCartItems", {
      //       userId,
      //     });

      //     navigate("/payment", { state: { orderDetails } });
      //   }
      // }

      // if (orderDetails.paymentMethod === "onlinePayment") {
      //   navigate("/payment", { state: { orderDetails } });
      // }

    } catch (error) {
      toast.error("Failed to place order. Please try again later.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          checkout
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
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
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
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* <CheckoutOrderSummary /> */}

        <div className="px-4 pt-5">
          <div className="flex justify-between  ">
            <div className="flex items-center gap-3">
              {selectedAddress != undefined ? (
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#63E6BE" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faLocationDot}
                  beat
                  style={{ color: "#63E6BE" }}
                />
              )}

              <p className="text-xl font-medium">Address</p>
            </div>
            <div className="mt-4 mr-2 ">
              <button
                onClick={() => {
                  setAddressTab(!addressTab);
                }}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-5 text-sm text-white uppercase w-full"
              >
                + address
              </button>

              {addressTab ? (
                <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
              ) : (
                ""
              )}

              {addressTab && (
                <AddressInput
                  userId={userId}
                  setAddress={handleAddressAdded}
                  onClose={() => {
                    setAddressTab(false);
                  }}
                />
              )}
            </div>
          </div>
          <p className="text-gray-400">
            select your address or add a new address.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {selectedAddress !== undefined ? (
              <div className="flex justify-between   ">
                <div>
                  <div className="flex items-center gap-2 mb-2 ">
                    <FontAwesomeIcon icon={faLocationDot} />

                    <h3 className="text-[#093bc9] font-semibold ">
                      {selectedAddress?.city}
                    </h3>
                  </div>

                  <div className="w-[300px]">
                    <p>{selectedAddress?.street}</p>
                    <p>{`${selectedAddress?.state} - ${selectedAddress?.zipCode} `}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUpdateAddressTab(!addressTab);
                    }}
                    className="text-[#094fc9] font-normal mt-3"
                  >
                    Edit address
                  </button>

                  {updateAddressTab ? (
                    <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
                  ) : (
                    ""
                  )}

                  {updateAddressTab && (
                    <UpdateAddressInput
                      userId={userId}
                      currentAddress={selectedAddress}
                      onhandleUpdateAddress={handleUpdateAddress}
                      onClose={() => {
                        setUpdateAddressTab(false);
                      }}
                    />
                  )}
                </div>

                <div>
                  <button
                    onClick={() => {
                      setChooseaddressTab(!chooseaddressTab);
                    }}
                    className="text-[#093bc9] font-medium"
                  >
                    Choose another address
                  </button>
                </div>

                {chooseaddressTab ? (
                  <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
                ) : (
                  ""
                )}

                {chooseaddressTab && (
                  <ChooseAddress
                    onClose={() => {
                      setChooseaddressTab(false);
                    }}
                    onAddressSelect={handleAddressSelect}
                  />
                )}
              </div>
            ) : (
              <p className="text-red-500">add a new address</p>
            )}

           
          </div>

          <div className="mt-8 space-y-3 max-h-[250px] overflow-auto rounded-lg border bg-white px-2 py-4 sm:px-6 custom-scrollbar">

          
            <CouponCard  />
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
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentChange}
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
                checked={paymentMethod === "onlinePayment"}
                onChange={handlePaymentChange}
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
          </form> */}
        </div>

        <CheckoutOrderSummary
          onPlaceOrder={handleOnPlaceOrder}
          orderCartItem={handleOrderCartItem}
        />

       
      </div>
    </div>
  );
};

export default CheckoutPage;
