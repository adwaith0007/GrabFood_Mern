import  { useEffect, useState } from 'react';
import UserSidebar from '../../../components/user/UserSidebar';
import api from '../../../api';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';

const MyWalletPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user._id;

  const [balance, setBalance] = useState<number | undefined>();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await api.get(`/user/${userId}/wallet`);
        setBalance(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWalletBalance();
  }, [userId]);

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="px-4 pt-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="text-xl font-medium">My Wallet</p>
          </div>
          <div className="mt-4 mr-2">
            <button
              onClick={() => {
                // Handle adding amount to wallet
              }}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-5 text-sm text-white uppercase w-full"
            >
              Add Amount
            </button>
          </div>
        </div>
        <p className="text-gray-400">Your current wallet balance:</p>
        <div className="mt-8 space-y-3 h-60 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-black text-2xl font-semibold">
              Balance: {balance ? `₹${balance}` : 'Loading...'}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWalletPage;