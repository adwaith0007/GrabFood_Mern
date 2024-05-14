// import  { useEffect, useState } from 'react';
// import UserSidebar from '../../../components/user/UserSidebar';
// import api from '../../../api';
// import { useSelector } from 'react-redux';
// import { UserReducerInitialState } from '../../../types/reducer-types';

// const MyWalletPage = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );
//   const userId = user._id;

//   const [balance, setBalance] = useState<number | undefined>();

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const response = await api.get(`/user/${userId}/wallet`);
//         setBalance(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchWalletBalance();
//   }, [userId]);

//   return (
//     <div className="admin-container">
//       <UserSidebar />
//       <div className="px-4 pt-5">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-3">
//             <p className="text-xl font-medium">My Wallet</p>
//           </div>
//           <div className="mt-4 mr-2">
//             <button
//               onClick={() => {
//                 // Handle adding amount to wallet
//               }}
//               className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-5 text-sm text-white uppercase w-full"
//             >
//               Add Amount
//             </button>
//           </div>
//         </div>
//         <p className="text-gray-400">Your current wallet balance:</p>
//         <div className="mt-8 space-y-3 h-60 rounded-lg border bg-white px-2 py-4 sm:px-6">
//           <div className="flex items-center gap-2 mb-2">
//             <h3 className="text-black text-2xl font-semibold">
//               Balance: {balance ? `₹${balance}` : 'Loading...'}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyWalletPage;




import { useEffect, useState } from "react";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import api from "../../../api";
import UserSidebar from "../../../components/user/UserSidebar";
import { UserReducerInitialState } from "../../../types/reducer-types";

interface DataType {
  orderId: string;
  no: number;
  order: string;
  date: React.ReactElement;
  amount: React.ReactElement;
  transaction: React.ReactElement;
  totalPrice: number;
  status: string;
  orderDetails: React.ReactElement;
  manageAction: React.ReactElement;
  productName: React.ReactElement;
  unitPrice: React.ReactElement;
  item: React.ReactElement;
  action: React.ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: <div className="flex justify-center ">S.no</div>,
    accessor: "no",
  },
  {
    Header: <div className="flex justify-center ">Date</div>,
    accessor: "date",
  },

  {
    Header: <div className="flex justify-center ">Transaction</div>,
    accessor: "transaction",
  },
  {
    Header: <div className="flex justify-center ">Amount</div>,
    accessor: "amount",
  },
 
];

const MyWalletPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user._id;

  const [rows, setRows] = useState<DataType[]>([]);
  const [userFavourites, setUserFavourites] = useState<any>([]);
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

  console.log("balance", balance)

  // const handleRemove = (productId) => {
  //   // Handle remove functionality
  // };

  const fetchingFavourites = async () => {
    try {
      
      const response = await api.get(`/order/${userId}/transactions`);
      if (response.data.success) {
        setUserFavourites(response.data.transactions);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  console.log(userFavourites)

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  useEffect(() => {
    const newRows = userFavourites.map((item, index) => ({
      
      no: <div className="flex justify-center ">{index + 1}</div>,
      date: (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center"> {item?.date}</div>
          
        </div>
      ),
      transaction: (
        <div className="flex justify-center">
          { item.type}
        </div>
      ),
      amount: (
        <div className="flex justify-center">
          ₹{ item.amount}
        </div>
      ),
     
      totalPrice: item.totalPrice, // Assuming you have a totalPrice field
    }));

    setRows(newRows);
  }, [userFavourites]);

  // Function to calculate total
  // const calculateTotal = () => {
  //   return rows.reduce((total, row) => total + row.totalPrice, 0);
  // };

  return (
    <div className="admin-container">
      <UserSidebar />

      {/* Render your table inside a div with specified height */}
      <div className="table-container" style={{  overflowY: "auto" }}>
        <table className="table" style={{ width: "100%" }}>
          {/* Table header */}
          <thead>
            <tr>
              {columns.map(column => (
                <th key={String(column.accessor)} className="text-center">
                  {/* @ts-ignore */}
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="text-center">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Total row */}
          <tfoot>
            <tr>
              <td colSpan={3} className="  justify-center text-center">
                Total:
              </td>
              <td className=" flex justify-center text-center">{balance?.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyWalletPage;



