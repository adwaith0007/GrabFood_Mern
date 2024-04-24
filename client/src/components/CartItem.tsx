
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex justify-between p-4 border-b border rounded-[10px]">
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
        <div className="flex gap-10">
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

export default CartItem;