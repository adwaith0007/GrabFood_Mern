import UserSidebar from '../../../components/user/UserSidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../../components/admin/TableHOC';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';

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
  products: Product[];
  address: Address[];
  paymentMethod: string;
  paymentStatus: boolean;
  status: string;
  createdAt: string;
}

interface DataType {
  orderId: string;
  photo: JSX.Element;
  name: string;
  price: number;
  quantity: number;
  status: JSX.Element;
  cancelAction: JSX.Element;
}

const columns: Column<DataType>[] = [
  { Header: 'Photo', accessor: 'photo' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Quantity', accessor: 'quantity' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Action', accessor: 'cancelAction' },
];

const OrderProductPage = () => {
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const userId = user._id;

  const { orderId } = useParams<{ orderId: string }>();



  const [rows, setRows] = useState<DataType[]>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCancelProduct = async (orderId: string, productId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/order/cancel/${orderId}/product/${productId}`
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
      const response = await axios.get(`http://localhost:5000/api/order/user/${userId}`);
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

 console.log(userOrders);
  

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





  useEffect(() => {
    
    const singleOrder = userOrders.find((order) => order._id === orderId);

    if (singleOrder) {
      const newRows: DataType[] = singleOrder.products.map((product) => ({
        orderId: singleOrder._id,
        photo: (
          <img
            src={`http://localhost:5000/${product.productImage[0]?.replace(/ /g, '%20')}`}
            alt={product.productName}
          />
        ),
        name: product.productName,
        price: product.price,
        quantity: product.quantity,
        status: (
          <p>
            <span className={getStatusColor(singleOrder.status)}>{singleOrder.status}</span>
          </p>
        ),
        cancelAction: (
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={() => handleCancelProduct(singleOrder._id, product.productId)}
          >
            Cancel
          </button>
        ),
      }));

      setRows(newRows);
    }
  }, [userOrders, orderId]);




  const Table = TableHOC<DataType>(columns, rows, 'dashboard-product-box', 'Orders', rows.length > 6)();

  return (
    <div className="admin-container">
      <UserSidebar />
      <main>{Table}</main>
      
    </div>
  );
};

export default OrderProductPage;
