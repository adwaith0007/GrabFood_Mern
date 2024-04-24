import axios from "axios";
import  { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// import ProceedToPaymentPopup from "../components/ProceedToPaymentPopup";

import PaymentAddressInputPopup from "../components/PaymentAddressInputPopup";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";



const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {

  
  
  
  
  return (
    

    <div className="flex  justify-between p-4 border-b border rounded-[10px] ">

      
      <div className="flex items-center space-x-4">
        <div>
        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />

        </div>
        
      </div>

      
      <div className="flex flex-col items-center space-x-4">

        <div>
          <p className="text-lg font-semibold">{item.name}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => onDecrease(item.productId)}>
            <AiOutlineMinus size={18} className="text-gray-700 cursor-pointer" />
          </button>
          <span className="text-lg">{item.quantity}</span>
          <button onClick={() => onIncrease(item.productId)}>
            <AiOutlinePlus size={18} className="text-gray-700 cursor-pointer" />
          </button>
        </div>
        <div className="flex gap-10" >
          <p className="text-gray-500">Quantity: {item.quantity}</p>

        <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
        </div>

      </div>
        <button onClick={() => onRemove(item.productId)}>
          <AiOutlineClose size={20} className="text-red-500 cursor-pointer" />
        </button>
    </div>
  );
};

const CartSidebar = ({ cartItems, closeCart, onRemove, onIncrease, onDecrease,  }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const {user} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)

  const user_id = user._id

  

  useEffect(() => {
    console.log('effect');
    
    // Fetch cart items when the component mounts
    axios.get(`http://localhost:5000/api/cart/${user_id}`) // Replace with actual userId
      .then((response) => {
        // setCartItems(response.data);
        console.log(`data: ${response.data}`);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  // This useEffect seems to be unused. You may remove it if unnecessary.


  const handleProceedToPayment = () => {
    setShowPaymentPopup(true);
  };

  return (
    <div className="fixed top-0 right-0 w-[400px] h-screen bg-white z-10 duration-300 shadow-lg">
      <AiOutlineClose
        onClick={closeCart}
        size={30}
        className="absolute right-4 top-6 cursor-pointer"
      />

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={onRemove}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">₹{totalAmount}</p>
      </div>

      <div className="p-4">
        <button
          onClick={handleProceedToPayment}
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
        >
          Proceed to Payment
        </button>
      </div>

      {showPaymentPopup && (
        // <ProceedToPaymentPopup
        <PaymentAddressInputPopup
          cartItems={cartItems}
          userId={user_id} // Replace with actual userId
          onClose={() => setShowPaymentPopup(false)}
        />
      )}
    </div>
  );
};

export default CartSidebar;