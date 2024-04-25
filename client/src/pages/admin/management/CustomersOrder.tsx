// import UserSidebar from '../../components/user/UserSidebar';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ReactElement } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { Link, useParams } from 'react-router-dom';
// import { Column } from 'react-table';
// import TableHOC from '../../components/admin/TableHOC';
// import { useSelector } from 'react-redux';
// import { UserReducerInitialState } from '../../types/reducer-types';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import toast from 'react-hot-toast';

// // Define interfaces for order data
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
//   products: Product[];
//   address: Address[];
//   paymentMethod: string;
//   paymentStatus: boolean;
//   status: string;
//   createdAt: string;
// }

// interface DataType {
//   orderId: string;
//   photo: ReactElement;
//   name: string;
//   price: number;
//   quantity: number;
//   status: string;
//   cancelAction: ReactElement;
// }

// const columns: Column<DataType>[] = [
//   { Header: 'Photozz', accessor: 'photo' },
//   { Header: 'Name', accessor: 'name' },
//   { Header: 'Quantity', accessor: 'quantity' },
//   { Header: 'Price', accessor: 'price' },
//   { Header: 'Status', accessor: 'status' },
// //   { Header: 'Action', accessor: 'cancelAction' },
// ];

// const CustomersProducts = () => {
// //   const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  
// const { customerId } = useParams<{ customerId: string }>();

//   const userId = customerId;

//   const [rows, setRows] = useState<DataType[]>([]);
//   const [customerData, setCustomerData] = useState([]);
//   const [userOrders, setUserOrders] = useState<OrderData[]>([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/admin/customers`)
//       .then((res) => {
//         if (res.data.success) {
//           setCustomerData(res.data.data);
//         } else {
//           toast.error("Error while loading categories");
//         }
//       })
//       .catch((error) => {
//         toast.error("Error while loading categories");
//         console.log(error);
//       });
//   }, []);

//   console.log(customerData);





//   const handleCancelProduct = async (orderId: string, productId: string) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/order/cancel/${orderId}/product/${productId}`
//       );
//       if (response.data.success) {
        
//         console.log('Product canceled:', productId, 'from order:', orderId);
//         // After canceling, fetch the updated orders
//         fetchUserOrders();
//       } else {
//         console.error('Failed to cancel product:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error canceling product:', error);
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/order/user/${userId}`);
//       if (response.data.success) {
//         setUserOrders(response.data.orders);
//       } else {
//         console.error('Failed to fetch user orders:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error fetching user orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Processing':
//         return 'red';
//       case 'Shipped':
//         return 'green';
//       case 'Delivered':
//         return 'purple';
//       default:
//         return 'black'; 
//     }
//   };

//   useEffect(() => {
//     fetchUserOrders();
//   }, [userId]);

//   useEffect(() => {
    
//     const newRows: DataType[] = userOrders.flatMap((order) =>
//       order.products.map((product) => ({
//         orderId: order._id,
//         photo: (
//           <img
//             src={`http://localhost:5000/${product.productImage[0]?.replace(/ /g, '%20')}`}
//             alt={product.productName}
//           />
//         ),
//         name: product.productName,
//         price: product.price,
//         quantity: product.quantity,
        
//         status: (<p><span className={getStatusColor(order.status)}>{order.status}</span></p>),
//         // cancelAction: (
//         //   <button className='bg-red-500 text-white px-4 py-2 rounded '  onClick={() => handleCancelProduct(order._id, product.productId)}>
//         //     Cancel 
//         //   </button>
//         // ),
//       }))
//     );

//     setRows(newRows);
//   }, [userOrders]);

//   const Table = TableHOC<DataType>(columns, rows, 'dashboard-product-box', 'Orders', rows.length > 6)();

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table}</main>
      
//     </div>
//   );
// };

// export default CustomersProducts;



// import UserSidebar from '../../../components/user/UserSidebar';
import  { useEffect, useState } from 'react';
// import axios from 'axios';
import { ReactElement } from 'react';
// import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../../components/admin/TableHOC';
// import { useSelector } from 'react-redux';
// import { UserReducerInitialState } from '../../../types/reducer-types';
import AdminSidebar from '../../../components/admin/AdminSidebar';

import api from '../../../api';
// const server = import.meta.env.VITE_SERVER;

// Define interfaces for order data
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
  totalPrice:number;
  paymentStatus: boolean;
  status: string;
  createdAt: string;
}

// interface DataType {
//     // orderId: string;
//     no: number;
//     order: string;
//     totalPrice: ReactElement;
//     status: string;
//   orderDetails: ReactElement;
//   // manageAction: ReactElement;
// }


interface DataType {
  no: number;
  order: ReactElement;
  totalPrice: ReactElement;
  status: ReactElement;
  orderDetails: ReactElement;
}


const columns: Column<DataType>[] = [
  { Header:(<div className='flex justify-center ' >S.NO</div> ) , accessor: 'no' },
  { Header:(<div className='flex justify-center ' >Order</div> ), accessor: 'order' },
  { Header:(<div className='flex justify-center ' >Total Price</div> ) , accessor: 'totalPrice' },
  { Header:(<div className='flex justify-center ' >Status</div> ) , accessor: 'status' },
  { Header:(<div className='flex justify-center ' >Order Details</div> ) , accessor: 'orderDetails' },
  
];

const CustomersOrder = () => {
  // const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  // const userId = user._id;

  const { customerId } = useParams<{ customerId: string }>();

  const userId= customerId

  console.log(customerId);
  

  const [rows, setRows] = useState<DataType[]>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  // const [loading, setLoading] = useState(true);

  // const handleCancelProduct = async (orderId: string, productId: string) => {
  //   try {
  //     const response = await api.put(
  //       `/order/cancel/${orderId}/product/${productId}`
  //     );
  //     if (response.data.success) {
        
  //       console.log('Product canceled:', productId, 'from order:', orderId);
  //       // After canceling, fetch the updated orders
  //       fetchUserOrders();
  //     } else {
  //       console.error('Failed to cancel product:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error canceling product:', error);
  //   }
  // };

  const fetchUserOrders = async () => {
    try {
      const response = await api.get(`/order/user/${userId}`);
      if (response.data.success) {
        setUserOrders(response.data.orders);
      } else {
        console.error('Failed to fetch user orders:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  console.log(userOrders);
  

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'Processing':
  //       return 'red';
  //     case 'Shipped':
  //       return 'green';
  //     case 'Delivered':
  //       return 'purple';
  //     default:
  //       return 'black'; 
  //   }
  // };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  console.log(userOrders);


  
  

  useEffect(() => {

    const newRows:any = userOrders.map((order, index) => ({
      
        no: (<div className='flex justify-center ' >{index + 1}</div> ) ,
        order: (<div className=' flex flex-col justify-center gap-1   ' >

            <div className=' flex justify-center' >
           Id: {order._id}

            </div>

            <div className=' flex justify-center' >
          Date:  {order.orderDate}

            </div>

            
            </div> ) ,
        totalPrice:(<div className=' flex justify-center' >₹{order.totalPrice}</div> ),
        
        status: (<div className='flex justify-center ' >{order.status}</div> ) ,

        orderDetails: <Link className='flex justify-center'  to={`/admin/customer/${userId}/order/${order._id}/product`}>View</Link>,


        
  
        
  
  
      }));
    
    

    setRows(newRows);
  }, [userOrders]);

  const Table = TableHOC<DataType>(columns, rows, 'dashboard-product-box', 'Orders', rows.length > 6)();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      
    </div>
  );
};

export default CustomersOrder;

