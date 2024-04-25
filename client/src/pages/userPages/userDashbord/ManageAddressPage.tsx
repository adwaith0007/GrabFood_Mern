import  { useEffect, useState } from 'react'
import UserSidebar from '../../../components/user/UserSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import AddressInput from '../../../components/AddressInput';
import UpdateAddressInput from '../../../components/user/UpdateAddressInput';
import ChooseAddress from '../../../components/user/ChooseAddress';

import api from '../../../api';
// const server = import.meta.env.VITE_SERVER;

const ManageAddressPage = () => {

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;


  const [addressTab, setAddressTab] = useState(false);
  const [updateAddressTab, setUpdateAddressTab] = useState(false);
  const [chooseaddressTab, setChooseaddressTab] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>();


  useEffect(() => {
    if (userId) {
      api
        .get(`/user/${userId}/addresses`)

        .then((response) => {
          setSelectedAddress(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const handleAddressAdded = () => {
    
    if (userId) {
      api
        .get(`/user/${userId}/addresses`)
        .then((response) => {
          setSelectedAddress(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleUpdateAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };


  return (
    <div className="admin-container">
      <UserSidebar />
        
      <div className="px-4 pt-5">
          <div className="flex justify-between  ">
            <div className="flex items-center gap-3">
              {selectedAddress != undefined ? (
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#63E6BE" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faLocationDot}
                  beat
                  style={{ color: "#63E6BE" }}
                />
              )}

              <p className="text-xl font-medium">Address</p>
            </div>
            <div className="mt-4 mr-2 ">
              <button
                onClick={() => {
                  setAddressTab(!addressTab);
                }}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-5 text-sm text-white uppercase w-full"
              >
                + address
              </button>

              {addressTab ? (
                <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
              ) : (
                ""
              )}

              {addressTab && (
                <AddressInput
                  userId={userId}
                  setAddress={handleAddressAdded}
                  onClose={() => {
                    setAddressTab(false);
                  }}
                />
              )}
            </div>
          </div>
          <p className="text-gray-400">
            select your address or add a new address.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {selectedAddress != undefined ? (
              <div className="flex justify-between   ">
                <div>
                  <div className="flex items-center gap-2 mb-2 ">
                    <FontAwesomeIcon icon={faLocationDot} />

                    <h3 className="text-[#093bc9] font-semibold ">
                      {selectedAddress.city}
                    </h3>
                  </div>

                  <div className="w-[300px]">
                    <p>{selectedAddress.street}</p>
                    <p>{`${selectedAddress.state} - ${selectedAddress.zipCode} `}</p>
                  </div>

                  <button onClick={() => {
                  setUpdateAddressTab(!addressTab);
                }} className="text-[#094fc9] font-normal mt-3">
                    Edit address
                  </button>


                  {updateAddressTab ? (
                <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
              ) : (
                ""
              )}

              {updateAddressTab && (
                <UpdateAddressInput
                  userId={userId}
                  currentAddress={selectedAddress}
                  onhandleUpdateAddress={handleUpdateAddress}
                  onClose={() => {
                    setUpdateAddressTab(false);
                  }}
                />
              )}


                </div>

                <div>
                  <button
                    onClick={() => {
                      setChooseaddressTab(!chooseaddressTab);
                    }}
                    className="text-[#093bc9] font-medium"
                  >
                    Choose another address
                  </button>
                </div>

                {chooseaddressTab ? (
                  <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
                ) : (
                  ""
                )}

                {chooseaddressTab && (
                  <ChooseAddress
                    onClose={() => {
                      setChooseaddressTab(false);
                    }}
                    onAddressSelect={handleAddressSelect}
                  />
                )}
              </div>
            ) : (
              <p className="text-red-500" >add a new address</p>
            )}

            <div className="flex flex-col rounded-lg bg-white sm:flex-row"></div>
          </div>

          
        </div>


    </div>
  )
}

export default ManageAddressPage