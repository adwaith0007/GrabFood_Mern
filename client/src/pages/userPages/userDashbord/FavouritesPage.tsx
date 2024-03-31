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

import axios from "axios";
import toast from "react-hot-toast";

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
  const [userFavourites, setUserFavourites] = useState<OrderData[]>([]);
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


  
  const handleAddToCart = (productId) => {
    api
      .put(`/cart/add/wishlist/${userId}`, { productId, quantity: 1 })
      .then((response) => {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully");
        setUserFavourites(response.data.data);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product to cart. Please try again later.");
      });
  };


  const handleRemove = (productId) => {
    api
      .put(`/wishlist/remove/${userId}`, { productId, quantity: 1 })
      .then((response) => {
        console.log("Product removed from Favorites:", response.data);
        toast.success("Product removed from Favorites successfully");
        setUserFavourites(response.data.data);
      })
      .catch((error) => {
        console.error("Error removing from Favorites:", error);
        toast.error("Failed to remove product from Favorites. Please try again later.");
      });
  };



  const fetchingFavourites = async () => {
    try {
      const response = await api.get(`/user/${userId}/wishlist` );
      if (response.data.success) {
        setUserFavourites(response.data.data);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log('data:',userFavourites);
  

 

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  useEffect(() => {
    const newRows = userFavourites.map((item, index) => ({
      // item: <div className="flex justify-center ">{index + 1}</div>,

      item: <img className="flex justify-center" src={`${server}/${item?.productImage     }`}  ></img>,
      productName: (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center"> {item?.productName}</div>
         
        </div>
      ),
      unitPrice: (

        

          <div className="flex justify-center">₹{item?.discountPrice ? item.discountPrice : item.price}</div>
      ),
      
      action: (
        <div className=" flex justify-center  inline-block " key={item._id}>

          <div className="flex justify-center flex-col" >

          <div className="py-1 flex gap-3 " role="none">
                <button
                  className="flex gap-3  w-36  border rounded justify-center bg-black text-white  py-3 text-sm hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleAddToCart(item.productId)}
                >
                  
                  <span>Add To Cart</span>
                </button>
                <button
                  className="  flex border w-36  rounded justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleRemove(item.productId)}
                >
                  
                  <span>Remove </span>
                </button>
              </div>

         
                  </div>

          {activeDropdown === item._id && (
            <div
              className={` origin-top-right z-10  absolute left-0 mt-2 w-32 border-2 rounded-md shadow-lg bg-slate-50 ring-1 ring-black ring-opacity-5`}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-1" role="none">
                <button
                  className="flex gap-3 w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleCancelOrder(item._id)}
                >
                  <TbShoppingCartCancel />
                  <span>Cancel</span>
                </button>
                <button
                  className=" w-full flex text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => downloadInvoice(item._id)}
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
  }, [userFavourites, activeDropdown]);

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

