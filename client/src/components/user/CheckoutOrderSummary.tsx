import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";

const CheckoutOrderSummary = ({orderCartItem, onPlaceOrder}) => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/${userId}`
        );
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

  // console.log(cartItems);
  

  // orderCartItem(cartItems)

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-4 pt-8 relative ">
      <p className="text-xl font-medium">Order Summary </p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>

      <div  className="mt-8 space-y-3 max-h-[300px]  overflow-auto   rounded-lg border bg-white px-2 py-4 sm:px-6 custom-scrollbar">
        {cartItems.map((product) => (
          <div
            className="flex flex-col rounded-lg bg-white sm:flex-row"
            key={product._id}
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={`http://localhost:5000/${product.productImage[0]?.replace(
                / /g,
                "%20"
              )}`}
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
        ))}
      </div>

     
  <div className="flex font-semibold gap-2 py-6 ml-2 text-sm uppercase">
    <span>Total cost : </span>
    <span>₹{totalAmount}</span>
  </div>
  


      <button onClick={onPlaceOrder}  className=" absolute  bottom-0  w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutOrderSummary;