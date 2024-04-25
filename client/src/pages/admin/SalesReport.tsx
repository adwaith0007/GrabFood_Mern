import { useEffect, useState, } from "react";
import { ReactElement } from "react";
// import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../types/reducer-types";
import api from "../../api";
// import UserSidebar from "../../components/user/UserSidebar";
// import { TbShoppingCartCancel } from "react-icons/tb";
import AdminSidebar from "../../components/admin/AdminSidebar";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

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
  userName:string;
  phone:string;
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
  
paymentMethod: ReactElement;
  manageAction: ReactElement;
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
const SalesReport = () => {
  // const { user } = useSelector(
  //   (state: { userReducer: UserReducerInitialState }) => state.userReducer
  // );
  // const userId = user._id;

  const [rows, setRows] = useState<any>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  

  function filterDataByDate() {
    try {

      api.post('/order/filterDataByDate', { startDate, endDate })
        .then((res) => {
          if (res.data.success) {
            setUserOrders(res.data.data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while filtering", error);
    }
  }

  const downloadPDF = () => {
    const pdf:any = new jsPDF();

    const deliveredOrders = userOrders.filter(
      (order) => order.orderStatus === "Delivered"
    );
    //calculating total value
    const totalValue = deliveredOrders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    pdf.text("Sales Report", 14, 15);
    // Create a table
    pdf.autoTable({
      head: [["Name", "Phone", "Total", "Status"]],
      body: userOrders.map((row) => [row.userName, row.phone, row.totalPrice, row.orderStatus]),
      startY: 25,
    });

    pdf.text(
      `Total Order Value of Delivered Orders : ${totalValue}`,
      14,
      pdf.autoTable.previous.finalY + 10
    );

    pdf.save("sales_report.pdf");
  };

  const downloadXL = () => {
    const WorkSheet = XLSX.utils.json_to_sheet(userOrders);
    const NewSheet = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(NewSheet, WorkSheet, "Sales Report");

    XLSX.writeFile(NewSheet, "Sales Report.xlsx");
  };

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



  

  // const fetchUserOrders = async () => {
  //   try {
  //     const response = await api.get(`/orders`);
  //     if (response.data.success) {
  //       setUserOrders(response.data.allOrders);
  //     } else {
  //       console.error("Failed to fetch user orders:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user orders:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  // useEffect(() => {
  //   fetchUserOrders();
  // }, [userId]);

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
    "Sales Report",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div>


      <div className="flex justify-between items-center w-full px-5">
          <div>
            <input
              type="date"
              onChange={(e) => {
                setStartDate(e.target.value ? new Date(e.target.value) : null);
              }}
              value={startDate?.toISOString().slice(0, 10)}
              className="border border-black rounded-md px-1 mx-2"
            />
            <input
              type="date"
              onChange={(e) => {
                setEndDate(e.target.value ? new Date(e.target.value) : null);
              }}
              value={endDate.toISOString().slice(0, 10)}
              className="border border-black rounded-md px-1 mx-2"
            />
            {/* <button
              className="border px-1 mx-2 rounded-md bg-[#BBE1FA] border-gray-400 hover:border-black"
              onClick={filterDataByDate}
            >
              Go
            </button> */}

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"   onClick={filterDataByDate}
            >
              Go
            </button>

              

            {/* <button
              className="border border-gray-500 rounded-md px-2 "
              onClick={() => {
                setStartDate(null);
              }}
            >
              reset
            </button> */}

          </div>
          <div className="flex ">
            

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={downloadPDF}
            >
              Download Pdf</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"onClick={downloadXL}
              >
              Download xl</button>
          
          </div>
        </div>


      <main>{Table}</main>
              </div>
    </div>
  );
};

export default SalesReport;

