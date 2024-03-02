import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummarySection = ({ products,Amount }) => {
  // const getTotalPrice = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  return (
    // <div className="w-1/4">
    //   <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
    //   {cartItems.map(item => (
    //     <div key={item.productId} className="mb-4 border p-4 flex justify-between items-center">
    //       <div>
    //         <h3 className="text-xl font-bold">{item.name}</h3>
    //         <p>₹{item.price.toFixed(2)} each</p>
    //       </div>
    //       <div>
    //         <p>Qty: {item.quantity}</p>
    //       </div>
    //     </div>
    //   ))}
    //   <div className="border-t pt-4 mt-4">
    //     <h3 className="text-xl font-bold">Total: ₹{getTotalPrice().toFixed(2)}</h3>
    //   </div>
    // </div>

<div id="summary" className="w-1/4 px-8 py-10">
<h1 className="font-semibold text-2xl border-b pb-8">
  Order Summary
</h1>
<div className="flex justify-between mt-10 mb-5">
  <span className="font-semibold text-sm uppercase">
    Items {products.length}
  </span>
  {/* <span className="font-semibold text-sm">${totalAmount}</span> */}
</div>
<div>
  <label className="font-medium inline-block mb-3 text-sm uppercase">
    Shipping
  </label>
  <select className="block p-2 text-gray-600 w-full text-sm">
    <option>Standard shipping - $10.00</option>
  </select>
</div>
<div className="py-10">
  <label
    htmlFor="promo"
    className="font-semibold inline-block mb-3 text-sm uppercase"
  >
    Promo Code
  </label>
  <input
    type="text"
    id="promo"
    placeholder="Enter your code"
    className="p-2 text-sm w-full"
  />
</div>
<button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
  Apply
</button>
<div className="border-t mt-8">
  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
    <span>Total cost</span>
    <span>₹{Amount}</span>
  </div>
  <Link to='/checkout' className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-3 text-sm text-white uppercase w-full">
    Checkout
  </Link>
</div>
</div>



  );
};

export default OrderSummarySection;