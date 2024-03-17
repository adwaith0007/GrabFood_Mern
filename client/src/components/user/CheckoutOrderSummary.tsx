import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import api from '../../api';

const CheckoutOrderSummary = ({ orderCartItem, onPlaceOrder }) => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(`/cart/${userId}`);
        setCartItems(response.data.cart);
        orderCartItem(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/coupon/apply', { couponCode });
      setDiscount(response.data.discount);
    } catch (error) {
      console.error("Error applying coupon:", error);
      // Add appropriate error handling or feedback to the user
    }
  };

  let totalAmount;

  if (discount !== undefined && discount !== null) {
    const discountPercentage = parseFloat(discount);
    if (!isNaN(discountPercentage)) {
        totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discountAmount = (totalAmount * discountPercentage) / 100;
        totalAmount -= discountAmount;
    } else {
        console.log("Invalid discount value:", discount);
    }
  } else {
    totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  return (
    <div className="px-4 pt-8 relative ">
      <p className="text-xl font-medium">Order Summary </p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>

      <div className="mt-8 space-y-3 max-h-[220px]  overflow-auto   rounded-lg border bg-white px-2 py-4 sm:px-6 custom-scrollbar">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cartItems.map((product) => (
            <div
              className="flex flex-col rounded-lg bg-white sm:flex-row"
              key={product._id}
            >
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={`http://localhost:5000/${product.productImage[0]?.replace(/ /g, "%20")}`}
                alt={product.name}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{product.productName}</span>
                <span className="float-right text-gray-400">
                  Qua: {product.quantity}{" "}
                </span>
                <p className="text-lg font-bold">₹{product.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleApplyCoupon} className="py-5">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Coupon Code
        </label>
        <div className="flex">
          <input
            type="text"
            id="promo"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter your code"
            className="p-2 text-sm border-2  w-full"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
          >
            Apply
          </button>

        </div>
      </form>

      { discount &&(

        
        <div className="flex font-semibold justify-end gap-3 text-sm uppercase">
          <span>discount</span>
          <span>{discount}%</span>
        </div>
          )
      }


      <div className="border-t mt-3">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <button
        onClick={() => onPlaceOrder(totalAmount)}
        className=" absolute  bottom-0  w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutOrderSummary;
