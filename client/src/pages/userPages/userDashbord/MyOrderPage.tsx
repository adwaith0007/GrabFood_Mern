import UserSidebar from '../../../components/user/UserSidebar';
import React, { useEffect, useState } from 'react';

import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../../components/admin/TableHOC';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';

import api from '../../../api';
const server = import.meta.env.VITE_SERVER;

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

interface DataType {
    orderId: string;
    no: number;
    order: string;
    totalPrice: number;
    status: string;
  orderDetails: ReactElement;
  manageAction: ReactElement;
}

const columns: Column<DataType>[] = [
  { Header:(<div className='flex justify-center ' >S.NO</div> ) , accessor: 'no' },
  { Header:(<div className='flex justify-center ' >Order</div> ), accessor: 'order' },
  { Header:(<div className='flex justify-center ' >Total Price</div> ) , accessor: 'totalPrice' },
  { Header:(<div className='flex justify-center ' >Status</div> ) , accessor: 'status' },
  { Header:(<div className='flex justify-center ' >Order Details</div> ) , accessor: 'orderDetails' },
  
];

const MyOrderPage = () => {
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const userId = user._id;

  const [rows, setRows] = useState<DataType[]>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCancelProduct = async (orderId: string, productId: string) => {
    try {
      const response = await api.put(
        `/order/cancel/${orderId}/product/${productId}`
      );
      if (response.data.success) {
        
        console.log('Product canceled:', productId, 'from order:', orderId);
        // After canceling, fetch the updated orders
        fetchUserOrders();
      } else {
        console.error('Failed to cancel product:', response.data.error);
      }
    } catch (error) {
      console.error('Error canceling product:', error);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'red';
      case 'Shipped':
        return 'green';
      case 'Delivered':
        return 'purple';
      default:
        return 'black'; 
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  console.log(userOrders);
  

  useEffect(() => {

    const newRows = userOrders.map((order, index) => ({
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

        orderDetails: <Link className='flex justify-center'  to={`/user/order/${order._id}/product`}>View</Link>,


        
  
        
  
  
      }));
    
    

    setRows(newRows);
  }, [userOrders]);

  const Table = TableHOC<DataType>(columns, rows, 'dashboard-product-box', 'Orders', rows.length > 6)();

  return (
    <div className="admin-container">
      <UserSidebar />
      <main>{Table}</main>
      
    </div>
  );
};

export default MyOrderPage;
