import React from 'react';

const OrderSummarySection = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="w-1/4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {cartItems.map(item => (
        <div key={item.productId} className="mb-4 border p-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>₹{item.price.toFixed(2)} each</p>
          </div>
          <div>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-xl font-bold">Total: ₹{getTotalPrice().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderSummarySection;