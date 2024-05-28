// import  { useEffect, useState } from "react";
// import CartSection from "./CartSection";
// // import OrderSummarySection from "./OrderSummarySection";
// // import axios from "axios";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import { useDispatch } from "react-redux";

// import { removeItemFromCart } from "../../../redux/reducer/cartReducer";
// import { addItemToCart } from "../../../redux/reducer/cartReducer";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";

// import api from "../../../api";
// import {log} from '../../../../logger';
// // const server = import.meta.env.VITE_SERVER;

// const CartPage = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user._id;
//   const dispatch = useDispatch();

//  const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchCartItems = async () => {
//   //     try {
//   //       const response = await api.get(`/cart/${userId}`);
//   //       setCartItems(response.data.cart);

//   //     } catch (error) {
//   //       console.error("Error fetching cart items:", error);
//   //       toast.error(error.response.data.message)
//   //     if (error.response.data.message === "User is blocked") {
//   //       Cookie.remove('token')
//   //       dispatch(userNotExist())
//   //       navigate("/login");

//   //   }
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchCartItems();
//   // }, [userId]);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await api.get(`/cart/${userId}`);
//         setCartItems(response.data.cart);
//         console.log("new Cart items:", response.data.cart);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         toast.error(error.response?.data?.message || 'An error occurred');
//         if (error.response?.data?.message === "User is blocked") {
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [userId, dispatch, navigate]);

//   useEffect(() => {
//     if (cartItems.length > 0) {
//       cartItems.forEach((item) => {
//         dispatch(addItemToCart({
//           name: item.name,
//           productId: item.productId,
//           price: item.price,
//           // imageUrl: `${server}/${item.productImage[0].replace(/ /g, "%20")}`,
//           quantity: item.quantity,
//         }));
//       });
//     }
//   }, [cartItems, dispatch]);

//   const handleRemoveFromCart = async (product) => {
//     try {
//       const response = await api.post(`/cart/remove/${userId}`, { product });
//       log.debug("Remove from cart response:", response.data);

//       if (response.data.success) {

//         setCartItems(response.data.cartItems);
//         log.debug("Cart items after removal:", response.data.cartItems);

//         dispatch(removeItemFromCart({ productId: product.productId }));
//       } else {
//         console.error("Remove from cart failed:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting from cart:", error);
//     }
//   };

//   const handleIncreaseQuantity = (product) => {
//     const maxQuantity = 5;

//     const existingItem = cartItems.find(
//       (item) => item.productId === product.productId
//     );

//     if (existingItem) {
//       const updatedQuantity = existingItem.quantity + 1;

//       if (updatedQuantity > maxQuantity) {

//         toast.error(`Cannot add more than ${maxQuantity} items to the cart.`);

//         return;
//       }

//       // Update the local cart state
//       const updatedCart = cartItems.map((item) =>
//         item.productId === product.productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCartItems(updatedCart);

//       // Make the API request to update the quantity on the backend
//       api
//         .post(`/cart/add/${userId}`, {
//           product,
//           quantity: 1,
//         })
//         .then((response) =>
//           log.debug("Product added to cart:", response.data)
//         )
//         .catch((error) => console.error("Error adding to cart:", error));
//     }
//   };

//   const handleDecreaseQuantity = (product) => {
//     api
//       .post(`/cart/decrease/${userId}`, {
//         product,
//         quantity: 1,
//       })
//       .then((response) =>
//         log.debug("Product decrease from cart:", response.data)
//       )
//       .catch((error) =>
//         console.error("Error Product decrease from cart:", error)
//       );

//     const updatedCart = cartItems.map((item) =>
//       item.productId === product.productId
//         ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//         : item
//     );
//     setCartItems(updatedCart);
//   };

//   const totalAmount = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="flex w-full">
//       <div className="container mx-auto ">
//         <div className="flex shadow-md ">
//           <div className="w-full bg-white px-10 py-10">
//             <div className="flex justify-between border-b pb-8">
//               <h1 className="font-semibold text-2xl">Shopping Cart</h1>
//               <h2 className="font-semibold text-2xl">
//                 {cartItems.length} Items
//               </h2>
//             </div>

//             <div className="flex mt-10 mb-5">
//               <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
//                 Product Details
//               </h3>
//               <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
//                 Quantity
//               </h3>
//               <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
//                 Price
//               </h3>
//               <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
//                 Total
//               </h3>
//             </div>

//             {!loading && cartItems.length > 0 ? (
//               <CartSection
//                 products={cartItems}
//                 onDeleteFromCart={(product) => handleRemoveFromCart(product)}
//                 onIncrease={(product) => handleIncreaseQuantity(product)}
//                 onDecrease={(product) => handleDecreaseQuantity(product)}
//               />
//             ) : (
//               <p>{loading ? "Loading..." : "Your cart is empty"}</p>
//             )}

//             <div className="flex flex-col-reverse md:flex-row md:justify-between  border-t ">
//               <div>
//                 <Link
//                   to="/menu"
//                   className="flex font-semibold text-indigo-600 text-sm mt-10 w-fit "
//                 >
//                   <svg
//                     className="fill-current mr-2 text-indigo-600 w-4"
//                     viewBox="0 0 448 512"
//                   >
//                     <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
//                   </svg>
//                   Continue Shopping
//                 </Link>
//               </div>

//               <div className="">
//                 <div className=" md:w-[320px]   ">
//                   <div className="flex font-semibold justify-between py- mt-10 text-sm uppercase">
//                     <span className="text-[12px]" >Total cost</span>
//                     <span>₹{totalAmount}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full  mt-10 flex justify-end  text-center ">

//               {cartItems?.length>0 &&(

//                 <Link
//                 to="/checkout"
//                 className="bg-indigo-500 font-semibold w-[300px] hover:bg-indigo-600 py-3 px-3 text-sm text-white uppercase "
//                 >
//             Checkout
//           </Link>
//           )}
//         </div>

//           </div>

//           {/* <OrderSummarySection products={cartItems} Amount={totalAmount} /> */}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CartPage;

import { useEffect, useState } from "react";
import CartSection from "./CartSection";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../redux/reducer/cartReducer";
import { addItemToCart } from "../../../redux/reducer/cartReducer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../../redux/reducer/useReducer";
import api from "../../../api";
import { log } from "../../../../logger";

const CartPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(`/cart/${userId}`);
        setCartItems(response.data.cart);
        log.debug("new Cart items:", response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error(error.response?.data?.message || "An error occurred");
        if (error.response?.data?.message === "User is blocked") {
          Cookie.remove("token");
          dispatch(userNotExist());
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, dispatch, navigate]);

  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        dispatch(
          addItemToCart({
            name: item.name,
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })
        );
      });
    }
  }, [cartItems, dispatch]);

  const handleIncreaseQuantity = (product) => {
    const maxQuantity = 5;

    const existingItem = cartItems.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;

      if (updatedQuantity > maxQuantity) {
        toast.error(`Cannot add more than ${maxQuantity} items to the cart.`);

        return;
      }

      
      const updatedCart = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);

    
      api
        .post(`/cart/add/${userId}`, {
          product,
          quantity: 1,
        })
        .then((response) => log.debug("Product added to cart:", response.data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  // const handleDecreaseQuantity = (product) => {
  //   api
  //     .post(`/cart/decrease/${userId}`, {
  //       product,
  //       quantity: 1,
  //     })
  //     .then((response) =>
  //       log.debug("Product decrease from cart:", response.data)
  //     )
  //     .catch((error) =>
  //       console.error("Error Product decrease from cart:", error)
  //     );
  // };




  const handleDecreaseQuantity = (product) => {


    log.debug("Product to decrease:", product);


    const existingItem = cartItems.find(
      (item) => item.productId === product.productId
    );

    if (existingItem && existingItem.quantity <= 1) {
      return;
    }
  
    if (existingItem && existingItem.quantity > 1) {
      const updatedQuantity = existingItem.quantity - 1;
  
     
      const updatedCart = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      setCartItems(updatedCart);
  
      
      api
        .post(`/cart/decrease/${userId}`, {
          product,
          quantity: 1,
        })
        .then((response) =>
          log.debug("Product decreased in cart:", response.data)
        )
        .catch((error) =>
          console.error("Error decreasing product in cart:", error)
        );
    } else if (existingItem && existingItem.quantity === 1) {
      handleRemoveFromCart(product);
    }
  };


  const handleRemoveFromCart = async (product) => {
    try {
      const response = await api.post(`/cart/remove/${userId}`, { product });
      log.debug("Remove from cart response:", response.data);

      if (response.data.success) {
        setCartItems(response.data.cartItems);
        dispatch(removeItemFromCart({ productId: product.productId }));
      } else {
        console.error("Remove from cart failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex w-full">
      <div className="container mx-auto ">
        <div className="flex shadow-md ">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems.length} Items
              </h2>
            </div>

            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>

            {!loading && cartItems.length > 0 ? (
              <CartSection
                products={cartItems}
                onDeleteFromCart={(product) => handleRemoveFromCart(product)}
                onIncrease={(product) => handleIncreaseQuantity(product)}
                onDecrease={(product) => handleDecreaseQuantity(product)}
              />
            ) : (
              <p>{loading ? "Loading..." : "Your cart is empty"}</p>
            )}

            <div className="flex flex-col-reverse md:flex-row md:justify-between border-t ">
              <div>
                <Link
                  to="/menu"
                  className="flex font-semibold text-indigo-600 text-sm mt-10 w-fit "
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="">
                <div className=" md:w-[320px]   ">
                  <div className="flex font-semibold justify-between py- mt-10 text-sm uppercase">
                    <span>Total cost</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full  mt-10 flex justify-end  text-center ">
              {cartItems?.length > 0 && (
                <Link
                  to="/checkout"
                  className="bg-indigo-500 font-semibold w-[300px] hover:bg-indigo-600 py-3 px-3 text-sm text-white uppercase "
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
