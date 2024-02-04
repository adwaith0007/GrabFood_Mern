import React, { useState } from "react";
import AddressInput from "../components/AddressInput";

const Demo = () => {
  
    const [userAddress, setUserAddress] = useState({});
    const [showAddressModal, setShowAddressModal] = useState(false);
  
    const handleProceedToPayment = () => {
      // Simulating a scenario where the address is incomplete
      setShowAddressModal(true);
    };
  return (
    <div>
      <h1>Test Menu Page</h1>
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>

      {/* AddressInput component */}
      {showAddressModal && (
        <AddressInput
          setAddress={setUserAddress}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </div>
  )
}

export default Demo