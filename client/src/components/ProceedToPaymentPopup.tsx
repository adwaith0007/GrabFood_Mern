// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddressInput from "./AddressInput";

// const ProceedToPaymentPopup = ({ cartItems, userId, onClose }) => {
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [showAddressInput, setShowAddressInput] = useState(false);

//   useEffect(() => {
//     // Fetch user addresses when the component mounts
//     if (userId) {
//       axios.get(`http://localhost:5000/api/userzzz/:${userId}/addresses`)
//         .then((response) => {
//           setAddresses(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [userId]);

//   const handleAddressChange = (address) => {
//     setSelectedAddress(address);
//   };

//   const handleProceedToPayment = () => {
//     // Implement the logic to proceed to payment with the selected address
//     console.log("Proceeding to payment with address:", selectedAddress);
//     onClose(); // Close the popup after proceeding to payment
//   };

//   const handleAddAddress = () => {
//     setShowAddressInput(true);
//   };

//   const handleAddressAdded = () => {
//     // Refresh the addresses after adding a new address
//     if (userId) {
//       axios.get(`http://localhost:5000/api/userxxx/${userId}/addresses`)
//         .then((response) => {
//           setAddresses(response.data);
//           setShowAddressInput(false);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   return (
//     <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
//       <div className="bg-white p-4 z-50 rounded-md shadow-md">
//         <h2 className="text-lg font-semibold mb-4">Proceed to Payment</h2>

//         {showAddressInput ? (
//           <AddressInput
//             userId={userId}
//             setAddress={handleAddressAdded}
//             onClose={() => setShowAddressInput(false)}
//           />
//         ) : (
//           <>
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-600">Select Address:</p>
//               <select
//                 value={selectedAddress ? selectedAddress._id : ""}
//                 onChange={(e) => {
//                   const selected = addresses.find((address) => address._id === e.target.value);
//                   setSelectedAddress(selected);
//                 }}
//                 className="mt-1 p-2 border rounded-md w-full"
//               >
//                 <option value="" disabled>Select an address</option>
//                 {addresses.map((address) => (
//                   <option key={address._id} value={address._id}>
//                     {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={handleAddAddress}
//               className="mt-2 p-2 bg-blue-500 text-white rounded-md mr-2"
//             >
//               Add Address
//             </button>

//             <button
//               onClick={handleProceedToPayment}
//               className="mt-2 p-2 bg-green-500 text-white rounded-md"
//             >
//               Proceed to Payment
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProceedToPaymentPopup;