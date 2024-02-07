import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Demo = ({ selectedOrder, onClose, onConfirmOrder }) => {
  if (!selectedOrder) {
     // Handle case where there is no selected order
     console.error("No order details available");
     return null;
   }
 
   const { products, totalAmount } = selectedOrder;
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 z-50 rounded-md shadow-md w-[400px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          {products.map((product) => (
            <div key={product.productId} className="flex items-center justify-between mb-2">
              <p className="text-gray-800">hjk</p>
              <p className="text-gray-600">Quantity: cv</p>
            </div>
          ))}
          <p className="text-lg font-semibold mt-2">Total Amount: ₹{totalAmount}</p>
        </div>

        <button
          // onClick={onConfirmOrder}
          className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Confirm Order
        </button>
      </div>
    </div>
  )
}

export default Demo