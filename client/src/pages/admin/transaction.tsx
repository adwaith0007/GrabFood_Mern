// import { ReactElement, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import TableHOC from "../../components/admin/TableHOC";
// import axios from "axios";
// import toast from "react-hot-toast";

// interface DataType {
//   user: string;
//   amount: number;
//   discount: number;
//   quantity: number;
//   status: ReactElement;
//   action: ReactElement;
// }

// const arr: Array<DataType> = [
//   {
//     user: "Charas",
//     amount: 4500,
//     discount: 400,
//     status: <span className="red">Processing</span>,
//     quantity: 3,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },

//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="green">Shipped</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="purple">Delivered</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
// ];

// const columns: Column<DataType>[] = [
//   {
//     Header: "Avatar",
//     accessor: "user",
//   },
//   {
//     Header: "Amount",
//     accessor: "amount",
//   },
//   {
//     Header: "Discount",
//     accessor: "discount",
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
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const Transaction = () => {
//   const [rows, setRows] = useState<DataType[]>(arr);
//   const [allOrders, setAllOrders] = useState()

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/orders`)
//       .then((res) => {
//         if (res.data.success) {
//           setAllOrders(res.data.allOrders);
//         } else {
//           toast.error("Error while loading categories");
//         }
//       })
//       .catch((error) => {
//         toast.error("Error while loading categories");
//         console.log(error);
//       });
//   }, []);

//   console.log(allOrders);
  

//   const Table = TableHOC<DataType>(
//     columns,
//     rows,
//     "dashboard-product-box",
//     "Transactions",
//     rows.length > 6
//   )();
//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table}</main>
//     </div>
//   );
// };

// export default Transaction;


import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getCustomers } from '../../helper/helper';
import axios from 'axios';
import { server } from '../../server';
import toast from "react-hot-toast";
import TableHOC from '../../components/admin/TableHOC';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Link } from 'react-router-dom';


// interface DataType {
//   photo: ReactElement;
//   name: string;
//   price: number;
//   category: string;
//   action: ReactElement;
// }




const columns = [
 

  {
    Header: 'S.no',
    accessor: 'no'
  },
  
  {
    Header: 'Product',
    accessor: 'product',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },

  {
    Header: 'Status',
    accessor: 'status',
  },

  { Header:(<div className='flex justify-center ' >All Orders</div> ) , accessor: 'orderDetails' },

  // {
  //   Header: 'BLOCK',
  //   accessor: 'block',
    
  // },
];










const Transaction = () => {





  const [customerData, setCustomerData] = useState([]);

  const [allOrders, setAllOrders] = useState([])

  const [rows, setRows] = useState([]);


  useEffect(() => {
        axios.get(`http://localhost:5000/api/orders`)
          .then((res) => {
            if (res.data.success) {
              setAllOrders(res.data.allOrders);
            } else {
              toast.error("Error while loading categories");
            }
          })
          .catch((error) => {
            toast.error("Error while loading categories");
            console.log(error);
          });
      }, []);
    
      console.log(allOrders);



  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/customers`)
      .then((res) => {
        if (res.data.success) {
          setCustomerData(res.data.data);
        } else {
          toast.error("Error while loading categories");
        }
      })
      .catch((error) => {
        toast.error("Error while loading categories");
        console.log(error);
      });
  }, []);

  console.log(customerData);


  
  

  useEffect(() => {
    const newRows = allOrders.map((item, index) => ({
      no: index + 1,
      product: item._id.productName,
      amount: item.totalPrice,
      quantity: item.totalQuantity,
      status: <div> {item._id.userName}  {item.countProcessing}   {item.overallStatus}    </div> ,

      orderDetails: <Link className='flex justify-center'  to={`/admin/customer/${item._id}/products`}>View</Link>,
      

      block: <button
          className={`px-2 py-1  ${
            item.isBlocked ? 'bg-red-500 text-white  ' : 'bg-green-500 text-white'
          }`}
          onClick={() => handleBlock(item._id, item.isBlocked   )}
        >
          {item.isBlocked ?   'Unblock' : 'Block'}
        </button>


    }));
    setRows(newRows);
  }, [customerData]);

  

  const handleBlock = async (id, isBlocked) => {
    try {
      
      console.log(id);
      
      const response = await axios.put(`http://localhost:5000/api/admin/customers?id=${id}`,
        { isBlocked: !isBlocked }
        );
     
      console.log(response); 
  
      // Update the local state with the new data after block/unblock
      const updatedCustomerData = customerData.map((customer) =>
        customer._id === id ? { ...customer, isBlocked: !isBlocked } : customer
      );
      setCustomerData(updatedCustomerData);

      toast.success(`Customer ${isBlocked ? 'Unblocked' : 'Blocked'} successfully`);
    } catch (error) {
      console.error('Error updating block status:', error);

      toast.error('Error updating block status');
    }
  };


  
  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    "Transaction",
    rows.length > 6
  )();


  return (
   

<div className="admin-container">
      <AdminSidebar />

<main>{Table}</main>
    </div>
  );
};



export default Transaction;