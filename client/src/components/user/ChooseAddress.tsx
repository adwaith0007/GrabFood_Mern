import axios from "axios";
import  { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";

const ChooseAddress = ({ onClose, onAddressSelect }) => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/user/${userId}/addresses`)
        .then((response) => {
          setAddresses(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
    }

    console.log(selectedAddress);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 z-50 rounded-md shadow-md w-[400px]">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Choose Your Address</h2>

        <form onSubmit={onSubmit} className="mt-5 grid gap-6">
          {addresses.map((address, index) => (
            <div key={index} className="relative">
              <input
                className="peer hidden"
                id={`radio_${index}`}
                type="radio"
                name="radio"
                onChange={() => setSelectedAddress(address)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor={`radio_${index}`}
              >
                <div className="ml-5">
                  <span className="mt-2 font-semibold">{address.street}</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChooseAddress;
