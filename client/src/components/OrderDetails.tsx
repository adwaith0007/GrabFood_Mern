
import CartItem from "./CartItem";

const OrderDetails = ({ cartItems, selectedAddress, selectedPaymentMethod, onClose }) => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <div className="mt-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={() => {}}
            onIncrease={() => {}}
            onDecrease={() => {}}
          />
        ))}
        <p className="text-lg font-semibold mt-2">Total Amount: ₹{getTotalAmount()}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">Selected Address:</p>
        <p>{`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}`}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">Selected Payment Method:</p>
        <p>{selectedPaymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}</p>
      </div>

      <button onClick={onClose} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Back to Payment
      </button>
    </div>
  );

  function getTotalAmount() {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
};

export default OrderDetails;