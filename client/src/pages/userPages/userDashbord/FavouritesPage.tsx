import { useEffect, useState } from "react";
import { ReactElement } from "react";
// import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import api from "../../../api";
import UserSidebar from "../../../components/user/UserSidebar";
// import { TbShoppingCartCancel } from "react-icons/tb";
const server = import.meta.env.VITE_SERVER;

// import axios from "axios";
import toast from "react-hot-toast";

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
//   products: Product[];
//   address: Address[];
//   paymentMethod: string;
//   totalPrice: number;
//   paymentStatus: boolean;
//   orderStatus: string;
//   createdAt: string;
// }

interface DataType {
  orderId: string;
  no: number;
  order: string;
  totalPrice: number;
  status: string;
  orderDetails: ReactElement;
  manageAction: ReactElement;
  productName: ReactElement;
  unitPrice: ReactElement;
  item: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: <div className="flex justify-center ">Item</div>,
    accessor: "item",
  },
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
  const [userFavourites, setUserFavourites] = useState<any>([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [popup, setPopup] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState();

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
    setPopup(true);

    setSelectedProductId(productId);
  };

  const confirmHandleRemove = async () => {
    await api
      .put(`/wishlist/remove/${userId}`, { selectedProductId, quantity: 1 })
      .then((response) => {
        console.log("Product removed from Favorites:", response.data);
        toast.success("Product removed from Favorites successfully");
        setUserFavourites(response.data.data);
        setPopup(false);
      })
      .catch((error) => {
        console.error("Error removing from Favorites:", error);
        toast.error(
          "Failed to remove product from Favorites. Please try again later."
        );
      });
  };

  const fetchingFavourites = async () => {
    try {
      const response = await api.get(`/user/${userId}/wishlist`);
      if (response.data.success) {
        setUserFavourites(response.data.data);
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

  console.log("data:", userFavourites);

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  useEffect(() => {
    const newRows = userFavourites.map((item) => ({
      // item: <div className="flex justify-center ">{index + 1}</div>,

      item: (
        <img
          className="flex justify-center"
          src={`${server}/${item?.productImage}`}
        ></img>
      ),
      productName: (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center"> {item?.productName}</div>
        </div>
      ),
      unitPrice: (
        <div className="flex justify-center">
          ₹{item?.discountPrice ? item.discountPrice : item.price}
        </div>
      ),

      action: (
        <div className=" flex justify-center   " key={item._id}>
          <div className="flex justify-center flex-col">
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
        </div>
      ),
    }));

    setRows(newRows);
  }, [userFavourites, activeDropdown]);

  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    // <p className="text-xl font-medium">Favourites</p>,
    "Products"
  )();

  return (
    <div className="admin-container">
      <UserSidebar />
      <main>{Table}</main>

      {popup && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-opacity-35 bg-black flex items-center justify-center">
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={() => setPopup(false)}
                type="button"
                data-behavior="cancel"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Are you sure you want remove <br /> from Favorites
                </h3>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => confirmHandleRemove()}
                type="button"
                data-behavior="commit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Remove
              </button>
              <button
                onClick={() => setPopup(false)}
                type="button"
                data-behavior="cancel"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
