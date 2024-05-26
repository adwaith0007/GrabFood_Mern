

import { useEffect, useState, useMemo } from "react";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import api from "../../../api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  const loadingRows = useMemo(
    () =>
      Array(12)
        .fill({})
        .map(() => ({
          no: (
            <div className="flex justify-center ">
              <Skeleton width={30} />,
            </div>
          ),

          date: (
            <div className="flex  justify-center gap-1">
              <Skeleton width={200} />,
            </div>
          ),

          transaction: (
            <div className="flex justify-center">
              <Skeleton width={100} />
            </div>
          ),
          amount: (
            <div className="flex justify-center">
              <Skeleton width={80} />
            </div>
          ),
        })),
    []
  );

  useEffect(() => {
    const newRows = loading
      ? loadingRows
      : userFavourites.map((item, index) => ({
          no: <div className="flex justify-center ">{index + 1}</div>,
          date: (
            <div className="flex flex-col justify-center gap-1">
              <div className="flex justify-center"> {item?.date}</div>
            </div>
          ),
          transaction: <div className="flex justify-center">{item.type}</div>,
          amount: <div className="flex justify-center">₹{item.amount}</div>,
          totalPrice: item.totalPrice, // Assuming you have a totalPrice field
        }));

    setRows(newRows);
  }, [userFavourites, loading, loadingRows]);

  return (
    <div className="h-full">
      <div className="table-container h-full" style={{ overflowY: "auto" }}>
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.accessor)} className="text-center">
                  {/* @ts-ignore */}
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="text-center">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="justify-center text-center">
                Total:
              </td>
              <td className="flex justify-center text-center">
                {balance !== undefined ? (
                  balance.toFixed(2)
                ) : (
                  <Skeleton width={50} />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyWalletPage;
