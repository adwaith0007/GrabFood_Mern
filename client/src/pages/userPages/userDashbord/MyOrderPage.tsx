import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../../components/admin/TableHOC';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import api from '../../../api';
import UserSidebar from '../../../components/user/UserSidebar';

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
  invoice: ReactElement; // Add invoice property to DataType interface
}

const columns: Column<DataType>[] = [
  { Header:(<div className='flex justify-center ' >S.NO</div> ) , accessor: 'no' },
  { Header:(<div className='flex justify-center ' >Order</div> ), accessor: 'order' },
  { Header:(<div className='flex justify-center ' >Total Price</div> ) , accessor: 'totalPrice' },
  { Header:(<div className='flex justify-center ' >Status</div> ) , accessor: 'status' },
  { Header:(<div className='flex justify-center ' >Order Details</div> ) , accessor: 'orderDetails' },
  { Header:(<div className='flex justify-center ' >Invoice</div> ) , accessor: 'invoice' }, // Display invoice button
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

  const downloadInvoice = async (orderId: string) => {
    try {
      // Fetch the invoice PDF for the given orderId
      const response = await api.get(`/order/invoice/${orderId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error fetching invoice:', error);
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
        return ' purple';
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
      
      

      status: (
        <p>
          <span className={`flex justify-center ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
        </p>
      ),

      orderDetails: <Link className='flex justify-center'  to={`/user/orders/${order._id}/product`}>View</Link>,

      
      invoice: 
      <div className='w-full flex justify-center ' >

    <button className="  bg-slate-700  text-white hover:bg-black  gap-3  font-bold py-2 px-4 rounded inline-flex items-center"
    onClick={() => downloadInvoice(order._id)}>
      <span>Download  </span>
      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
    </button>
      </div>
      
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
