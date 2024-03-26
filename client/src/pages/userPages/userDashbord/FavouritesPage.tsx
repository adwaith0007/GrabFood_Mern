import React, { useEffect, useState, useRef } from "react";
import { ReactElement } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import api from "../../../api";
import UserSidebar from "../../../components/user/UserSidebar";
import { TbShoppingCartCancel } from "react-icons/tb";
const server = import.meta.env.VITE_SERVER;

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
  products: Product[];
  address: Address[];
  paymentMethod: string;
  totalPrice: number;
  paymentStatus: boolean;
  orderStatus: string;
  createdAt: string;
}

interface DataType {
  orderId: string;
  no: number;
  order: string;
  totalPrice: number;
  status: string;
  orderDetails: ReactElement;
  manageAction: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  { Header: <div className="flex justify-center ">Item</div>, accessor: "item" },
  {
    Header: <div className="flex justify-center ">Product Name</div>,
    accessor: "productName",
  },
  {
    Header: <div className="flex justify-center ">Unit Price</div>,
    accessor: "unitPrice",
  },
  
  {
    Header: <div className="flex justify-center ">Action</div>,
    accessor: "action",
  },
];
const FavouritesPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user._id;

  const [rows, setRows] = useState<DataType[]>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

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



  const handleCancelOrder = async (orderId: string) => {
    try {

      console.log('clicked');
      
      console.log(orderId);
      
      
      const response = await api.put(`/order/cancel/${orderId}`,{userId});
      if (response.data.success) {
        console.log("Product canceled:", "from order:", orderId);

        fetchUserOrders();
      } else {
        console.error("Failed to cancel product:", response.data.error);
      }
    } catch (error) {
      console.error("Error canceling product:", error);
    }
  };

  const downloadInvoice = async (orderId: string) => {
    try {
      const response = await api.get(`/order/invoice/${orderId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await api.get(`/user/wishlist`, { userId } );
      if (response.data.success) {
        setUserOrders(response.data.data);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log('data:',userOrders);
  

 

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  useEffect(() => {
    const newRows = userOrders.map((order, index) => ({
      item: <div className="flex justify-center ">{index + 1}</div>,
      productName: (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center">Id: {order._id}</div>
          <div className="flex justify-center">Date: {order.orderDate}</div>
        </div>
      ),
      unitPrice: (
        <div className="flex justify-center">₹{order.totalPrice}</div>
      ),
      
      action: (
        <div className="relative w-full inline-block " key={order._id}>

          <div className="flex flex-col" >

          <div className="py-1 flex gap-3 " role="none">
                <button
                  className="flex gap-3 w-full  border rounded justify-center text-black px-2 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  <TbShoppingCartCancel />
                  <span>Cancel</span>
                </button>
                <button
                  className=" w-full flex border rounded justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => downloadInvoice(order._id)}
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download </span>
                </button>
              </div>

         
                  </div>

          {activeDropdown === order._id && (
            <div
              className={` origin-top-right z-10  absolute left-0 mt-2 w-32 border-2 rounded-md shadow-lg bg-slate-50 ring-1 ring-black ring-opacity-5`}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-1" role="none">
                <button
                  className="flex gap-3 w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  <TbShoppingCartCancel />
                  <span>Cancel</span>
                </button>
                <button
                  className=" w-full flex text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => downloadInvoice(order._id)}
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download </span>
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    }));

    setRows(newRows);
  }, [userOrders, activeDropdown]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    (<p className="text-xl font-medium">Favourites</p> ),
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <UserSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default FavouritesPage;

