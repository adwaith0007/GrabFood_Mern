


import  { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import api from "../../api";
import Skeleton from "react-loading-skeleton";

const columns = [
  {
    Header: "S.no",
    accessor: "no",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: <div className="flex justify-center ">All Orders</div>,
    accessor: "orderDetails",
  },
];

const Transaction = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/products`)
      .then((res) => {
        if (res.data.success) {
          setAllOrders(res.data.allOrders);
        } else {
          toast.error("Error while loading products");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newRows = allOrders.map((item, index) => ({
      no: index + 1,
      product: item._id.productName,
      amount: item.totalPrice,
      quantity: item.totalQuantity,
      status: (
        <div>
          {item._id.userName} {item.countProcessing} {item.overallStatus}
        </div>
      ),
      orderDetails: (
        <Link
          className="flex justify-center"
          to={`/admin/customer/${item._id}/products`}
        >
          View
        </Link>
      ),
    }));
    setRows(newRows);
  }, [allOrders]);

  const loadingRows = useMemo(
    () =>
      Array(10)
        .fill({})
        .map(() => ({
          no: <Skeleton width={30} />,
          product: <Skeleton width={100} />,
          amount: <Skeleton width={80} />,
          quantity: <Skeleton width={80} />,
          status: <Skeleton width={150} />,
          orderDetails: <Skeleton width={80} />,
        })),
    []
  );

  const Table = TableHOC(
    columns,
    loading ? loadingRows : rows,
    "dashboard-product-box",
    "Transaction",
    !loading && rows.length > 6
  )();

  return (
    <div className="h-full">
      <main className="h-full">{Table}</main>
    </div>
  );
};

export default Transaction;