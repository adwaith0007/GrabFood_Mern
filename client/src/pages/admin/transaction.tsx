// import { useEffect, useState } from "react";


// import toast from "react-hot-toast";
// import TableHOC from "../../components/admin/TableHOC";

// import { Link } from "react-router-dom";

// import api from "../../api";
// // const server = import.meta.env.VITE_SERVER;

// // interface DataType {
// //   photo: ReactElement;
// //   name: string;
// //   price: number;
// //   category: string;
// //   action: ReactElement;
// // }

// const columns = [
//   {
//     Header: "S.no",
//     accessor: "no",
//   },

//   {
//     Header: "Product",
//     accessor: "product",
//   },
//   {
//     Header: "Amount",
//     accessor: "amount",
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//   },

//   {
//     Header: "Status",
//     accessor: "status",
//   },

//   {
//     Header: <div className="flex justify-center ">All Orders</div>,
//     accessor: "orderDetails",
//   },

//   // {
//   //   Header: 'BLOCK',
//   //   accessor: 'block',

//   // },
// ];

// const Transaction = () => {
//   const [customerData, setCustomerData] = useState([]);

//   const [allOrders, setAllOrders] = useState([]);

//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     api
//       .get(`/orders/products`)
//       .then((res) => {
//         if (res.data.success) {
//           setAllOrders(res.data.allOrders);
//         } else {
//           toast.error("Error while loading products");
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
        
//       });
//   }, []);

//   console.log(allOrders);

//   useEffect(() => {
//     api
//       .get(`/admin/customers`)
//       .then((res) => {
//         if (res.data.success) {
//           setCustomerData(res.data.data);
//         } else {
//           toast.error("Error while loading customers");
//         }
//       })
//       .catch((error) => {
//         // toast.error("Error while loading categories");
//         toast.error(error.response.data.message);
//       });
//   }, []);

//   console.log(customerData);

//   useEffect(() => {
//     const newRows = allOrders.map((item, index) => ({
//       no: index + 1,
//       product: item._id.productName,
//       amount: item.totalPrice,
//       quantity: item.totalQuantity,
//       status: (
//         <div>
//           {" "}
//           {item._id.userName} {item.countProcessing} {item.overallStatus}{" "}
//         </div>
//       ),

//       orderDetails: (
//         <Link
//           className="flex justify-center"
//           to={`/admin/customer/${item._id}/products`}
//         >
//           View
//         </Link>
//       ),

//       block: (
//         <button
//           className={`px-2 py-1  ${
//             item.isBlocked
//               ? "bg-red-500 text-white  "
//               : "bg-green-500 text-white"
//           }`}
//           onClick={() => handleBlock(item._id, item.isBlocked)}
//         >
//           {item.isBlocked ? "Unblock" : "Block"}
//         </button>
//       ),
//     }));
//     setRows(newRows);
//   }, [customerData]);

//   const handleBlock = async (id, isBlocked) => {
//     try {
//       console.log(id);

//       const response = await api.put(`/admin/customers?id=${id}`, {
//         isBlocked: !isBlocked,
//       });

//       console.log(response);

//       // Update the local state with the new data after block/unblock
//       const updatedCustomerData = customerData.map((customer) =>
//         customer._id === id ? { ...customer, isBlocked: !isBlocked } : customer
//       );
//       setCustomerData(updatedCustomerData);

//       toast.success(
//         `Customer ${isBlocked ? "Unblocked" : "Blocked"} successfully`
//       );
//     } catch (error) {
//       console.error("Error updating block status:", error);

//       toast.error("Error updating block status");
//     }
//   };

//   const Table = TableHOC(
//     columns,
//     rows,
//     "dashboard-product-box",
//     "Transaction",
//     rows.length > 6
//   )();

//   return (
//     <div className="h-full " >
//       <main className="h-full" >{Table}</main>
//     </div>
//   );
// };

// export default Transaction;



import React, { useEffect, useState, useMemo } from "react";
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