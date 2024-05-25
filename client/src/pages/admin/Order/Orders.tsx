// import { useEffect, useState } from "react";
// import { ReactElement } from "react";
// // import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import TableHOC from "../../../components/admin/TableHOC";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import api from "../../../api";
// import Skeleton from "react-loading-skeleton";
// // import UserSidebar from "../../../components/user/UserSidebar";
// // import { TbShoppingCartCancel } from "react-icons/tb";

// // const server = import.meta.env.VITE_SERVER;

// interface Address {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// interface Product {
//   productId: string;
//   productName: string;
//   productImage: string[];
//   price: number;
//   quantity: number;
//   _id: string;
// }

// interface OrderData {
//   _id: string;
//   userId: string;
//   orderDate: string;
//   userName: string;
//   products: Product[];
//   address: Address[];
//   paymentMethod: string;
//   totalPrice: number;
//   paymentStatus: boolean;
//   orderStatus: string;
//   createdAt: string;
// }

// interface DataType {
//   orderId: ReactElement;
//   no: ReactElement;
//   order: ReactElement;
//   totalPrice: ReactElement;
//   status: ReactElement;

//   paymentMethod: ReactElement;
//   // manageAction: ReactElement;
//   action: ReactElement;
// }

// const columns: Column<DataType>[] = [
//   { Header: <div className="flex justify-center ">S.NO</div>, accessor: "no" },
//   {
//     Header: <div className="flex justify-center ">Order</div>,
//     accessor: "order",
//   },
//   {
//     Header: <div className="flex justify-center ">Total Price</div>,
//     accessor: "totalPrice",
//   },
//   {
//     Header: <div className="flex justify-center ">Status</div>,
//     accessor: "status",
//   },
//   {
//     Header: <div className="flex justify-center ">Payment Method</div>,
//     accessor: "paymentMethod",
//   },
//   {
//     Header: <div className="flex justify-center ">Action</div>,
//     accessor: "action",
//   },
// ];
// const Orders = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );
//   const userId = user?._id;

//   // console.log("userid:", userId)

//   const [rows, setRows] = useState([]);
//   const [userOrders, setUserOrders] = useState<OrderData[]>([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const closeDropdown = (event) => {
//   //     if (!event.target.closest(".dropdown")) {
//   //       setActiveDropdown(null);
//   //     }
//   //   };

//   //   if (activeDropdown !== null) {
//   //     document.addEventListener("mousedown", closeDropdown);
//   //   }

//   //   return () => {
//   //     document.removeEventListener("mousedown", closeDropdown);
//   //   };
//   // }, [activeDropdown]);

//   const fetchUserOrders = async () => {
//     try {
//       const response = await api.get(`/orders`);
//       if (response.data.success) {
//         setUserOrders(response.data.allOrders);
//       } else {
//         console.error("Failed to fetch user orders:", response.data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching user orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Processing":
//         return "purple";
//       case "Cancel":
//         return "red";
//       case "Shipped":
//         return "green";
//       case "Delivered":
//         return "purple";
//       default:
//         return "black";
//     }
//   };

//   useEffect(() => {
//     fetchUserOrders();
//   }, [userId]);

//   useEffect(() => {
    

//     const newRows = userOrders.map((order, index) => ({
//       no: <div className="flex justify-center ">{index + 1}</div>,
//       order: (
//         <div className="flex flex-col justify-center gap-1">
//           <div className="flex justify-center">Name: {order?.userName}</div>
//           <div className="flex justify-center">Date: {order.orderDate}</div>
//           <div className="flex justify-center">Id: {order._id}</div>
//         </div>
//       ),
//       totalPrice: (
//         <div className="flex justify-center">₹{order.totalPrice}</div>
//       ),
//       status: (
//         <p>
//           <span
//             className={`flex justify-center ${getStatusColor(
//               order.orderStatus
//             )}`}
//           >
//             {order.orderStatus}
//           </span>
//         </p>
//       ),

//       paymentMethod: (
//         <div className="flex flex-col justify-center gap-1">
//           <div className="flex justify-center"> {order?.paymentMethod}</div>
//         </div>
//       ),

//       action: (
//         <div className="flex justify-center">
//           <Link to={`/admin/orders/${order._id}`}>Manage</Link>
//         </div>
//       ),
//     }));

//     setRows(newRows);
//   }, []);

//   const loadingSkeletonRows = Array.from({ length: 6 }).map(() => ({
//     no: <Skeleton width={100} />,
//     order: <Skeleton width={200} />,
//     totalPrice: <Skeleton width={100} />,
//     status: <Skeleton width={100} />,
//     paymentMethod: <Skeleton width={100} />,
//     action: <Skeleton width={100} />,
//   }));

//   const Table = TableHOC<DataType>(
//     columns,
//     // true ? loadingSkeletonRows : rows,
//     rows,
//     "dashboard-product-box",
//     "Orders",
//     rows.length > 6
//   )();

//   return <main className="h-full">{Table}</main>;
// };

// export default Orders;

// import  { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import TableHOC from "../../../components/admin/TableHOC";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import api from "../../../api";
// import Skeleton from "react-loading-skeleton";

// interface Address {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// interface Product {
//   productId: string;
//   productName: string;
//   productImage: string[];
//   price: number;
//   quantity: number;
//   _id: string;
// }

// interface OrderData {
//   _id: string;
//   userId: string;
//   orderDate: string;
//   userName: string;
//   products: Product[];
//   address: Address[];
//   paymentMethod: string;
//   totalPrice: number;
//   paymentStatus: boolean;
//   orderStatus: string;
//   createdAt: string;
// }

// interface DataType {
//   orderId?: JSX.Element;
//   no: JSX.Element;
//   order: JSX.Element;
//   totalPrice: JSX.Element;
//   status: JSX.Element;
//   paymentMethod: JSX.Element;
//   action: JSX.Element;
// }

// const columns: Column<DataType>[] = [
//   { Header: <div className="flex justify-center ">S.NO</div>, accessor: "no" },
//   {
//     Header: <div className="flex justify-center ">Order</div>,
//     accessor: "order",
//   },
//   {
//     Header: <div className="flex justify-center ">Total Price</div>,
//     accessor: "totalPrice",
//   },
//   {
//     Header: <div className="flex justify-center ">Status</div>,
//     accessor: "status",
//   },
//   {
//     Header: <div className="flex justify-center ">Payment Method</div>,
//     accessor: "paymentMethod",
//   },
//   {
//     Header: <div className="flex justify-center ">Action</div>,
//     accessor: "action",
//   },
// ];

// const Orders = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );
//   const userId = user?._id;

//   const [rows, setRows] = useState<DataType[]>([]);
//   const [userOrders, setUserOrders] = useState<OrderData[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUserOrders = async () => {
//     try {
//       const response = await api.get(`/orders`);
//       if (response.data.success) {
//         setUserOrders(response.data.allOrders);
//       } else {
//         console.error("Failed to fetch user orders:", response.data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching user orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {

//     fetchUserOrders();
//   }, [userId]);

//   useEffect(() => {
//     if (loading) return; // Skip processing if still loading

//     const newRows = userOrders.map((order, index) => ({
//       no: <div className="flex justify-center ">{index + 1}</div>,
//       order: (
//         <div className="flex flex-col justify-center gap-1">
//           <div className="flex justify-center">Name: {order?.userName}</div>
//           <div className="flex justify-center">Date: {order.orderDate}</div>
//           <div className="flex justify-center">Id: {order._id}</div>
//         </div>
//       ),
//       totalPrice: (
//         <div className="flex justify-center">₹{order.totalPrice}</div>
//       ),
//       status: (
//         <p>
//           <span
//             className={`flex justify-center ${getStatusColor(
//               order.orderStatus
//             )}`}
//           >
//             {order.orderStatus}
//           </span>
//         </p>
//       ),
//       paymentMethod: (
//         <div className="flex flex-col justify-center gap-1">
//           <div className="flex justify-center">{order?.paymentMethod}</div>
//         </div>
//       ),
//       action: (
//         <div className="flex justify-center">
//           <Link to={`/admin/orders/${order._id}`}>Manage</Link>
//         </div>
//       ),
//     }));

//     setRows(newRows);
//   }, [userOrders, loading]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Processing":
//         return "purple";
//       case "Cancel":
//         return "red";
//       case "Shipped":
//         return "green";
//       case "Delivered":
//         return "purple";
//       default:
//         return "black";
//     }
//   };

//   const loadingSkeletonRows = Array.from({ length: 6 }).map(
//     () => ({
//       no: <Skeleton width={100} />,
//       order: <Skeleton width={200} />,
//       totalPrice: <Skeleton width={100} />,
//       status: <Skeleton width={100} />,
//       paymentMethod: <Skeleton width={100} />,
//       action: <Skeleton width={100} />,
//     })
//   );

//   const Table = TableHOC<DataType>(
//     columns,
//     loading ? loadingSkeletonRows : rows,
//     "dashboard-product-box",
//     "Orders",
//     rows.length > 6
//   )();

//   return <main className="h-full">{Table}</main>;
// };

// export default Orders;



import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import api from "../../../api";
// import Skeleton from "react-loading-skeleton";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Product {
  productId: string;
  productName: string;
  productImage: string[];
  price: number;
  quantity: number;
  _id: string;
}

interface OrderData {
  _id: string;
  userId: string;
  orderDate: string;
  userName: string;
  products: Product[];
  address: Address[];
  paymentMethod: string;
  totalPrice: number;
  paymentStatus: boolean;
  orderStatus: string;
  createdAt: string;
}

interface DataType {
  orderId: JSX.Element;
  no: JSX.Element;
  order: JSX.Element;
  totalPrice: JSX.Element;
  status: JSX.Element;
  paymentMethod: JSX.Element;
  action: JSX.Element;
}

const columns: Column<DataType>[] = [
  { Header: <div className="flex justify-center ">S.NO</div>, accessor: "no" },
  {
    Header: <div className="flex justify-center ">Order</div>,
    accessor: "order",
  },
  {
    Header: <div className="flex justify-center ">Total Price</div>,
    accessor: "totalPrice",
  },
  {
    Header: <div className="flex justify-center ">Status</div>,
    accessor: "status",
  },
  {
    Header: <div className="flex justify-center ">Payment Method</div>,
    accessor: "paymentMethod",
  },
  {
    Header: <div className="flex justify-center ">Action</div>,
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user?._id;

  const [rows, setRows] = useState<DataType[]>([]);
  // const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      const response = await api.get(`/orders`);
      if (response.data.success) {
        const ordersData: OrderData[] = response.data.allOrders;
        const newRows = ordersData.map((order, index) => ({
          orderId: <div key={order._id}>{order._id}</div>,
          no: <div className="flex justify-center ">{index + 1}</div>,
          order: (
            <div className="flex flex-col justify-center gap-1">
              <div className="flex justify-center">Name: {order?.userName}</div>
              <div className="flex justify-center">Date: {order.orderDate}</div>
              <div className="flex justify-center">Id: {order._id}</div>
            </div>
          ),
          totalPrice: (
            <div className="flex justify-center">₹{order.totalPrice}</div>
          ),
          status: (
            <p>
              <span
                className={`flex justify-center ${
                  getStatusColor(order.orderStatus)
                }`}
              >
                {order.orderStatus}
              </span>
            </p>
          ),
          paymentMethod: (
            <div className="flex flex-col justify-center gap-1">
              <div className="flex justify-center">{order?.paymentMethod}</div>
            </div>
          ),
          action: (
            <div className="flex justify-center">
              <Link to={`/admin/orders/${order._id}`}>Manage</Link>
            </div>
          ),
        }));
        setRows(newRows);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "purple";
      case "Cancel":
        return "red";
      case "Shipped":
        return "green";
      case "Delivered":
        return "purple";
      default:
        return "black";
    }
  };

  // const loadingSkeletonRows = Array.from({ length: 6 }).map((_, index) => ({
  //   orderId: <Skeleton key={index} width={100} />,
  //   no: <Skeleton key={index} width={100} />,
  //   order: <Skeleton key={index} width={200} />,
  //   totalPrice: <Skeleton key={index} width={100} />,
  //   status: <Skeleton key={index} width={100} />,
  //   paymentMethod: <Skeleton key={index} width={100} />,
  //   action: <Skeleton key={index} width={100} />,
  // }));

  const Table = TableHOC<DataType>(
    columns,
    // loading ? loadingSkeletonRows : rows,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return <main className="h-full">{Table}</main>;
};

export default Orders;



