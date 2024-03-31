// import React from "react";
// import { BsCart3 } from "react-icons/bs";

// const AddToCart = ({ cartItems, closeCart }) => {
//   return (
//     <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-4 transform translate-x-full transition-transform duration-300 ease-in-out">
//       <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.id}>
              
//               {item.name} - Quantity: {item.quantity} - Price: ${item.price}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button
//         className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
//         onClick={closeCart}
//       >
//         Close Cart
//       </button>
//     </div>
//   );
// };

// export default AddToCart;