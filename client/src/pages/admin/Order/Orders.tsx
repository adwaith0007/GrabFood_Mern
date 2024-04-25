import  { useEffect, useState } from "react";
import { ReactElement } from "react";
// import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import api from "../../../api";
// import UserSidebar from "../../../components/user/UserSidebar";
// import { TbShoppingCartCancel } from "react-icons/tb";
import AdminSidebar from "../../../components/admin/AdminSidebar";
// const server = import.meta.env.VITE_SERVER;

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
  userName:string;
  products: Product[];
  address: Address[];
  paymentMethod: string;
  totalPrice: number;
  paymentStatus: boolean;
  orderStatus: string;
  createdAt: string;
}

interface DataType {
  orderId: ReactElement;
  no: ReactElement;
  order: ReactElement;
  totalPrice: ReactElement;
  status: ReactElement;
  
paymentMethod: ReactElement;
  // manageAction: ReactElement;
  action: ReactElement;
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
  const userId = user._id;

  const [rows, setRows] = useState([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener("mousedown", closeDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [activeDropdown]);



  

  const fetchUserOrders = async () => {
    try {
      const response = await api.get(`/orders`);
      if (response.data.success) {
        setUserOrders(response.data.allOrders);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

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

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  useEffect(() => {
    const newRows = userOrders.map((order, index) => ({
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
            className={`flex justify-center ${getStatusColor(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
        </p>
      ),
      
paymentMethod: (
        

        <div className="flex flex-col justify-center gap-1">
        <div className="flex justify-center"> {order?.paymentMethod}</div>
        </div>
       
      ),

      action:(<div className="flex justify-center" >


          <Link to={`/admin/orders/${order._id}`}>Manage</Link>
      </div>
      ) 


    
    }));

    setRows(newRows);
  }, [userOrders, activeDropdown]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Orders;

