import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../../components/admin/TableHOC';
// import { useSelector } from 'react-redux';
// import { UserReducerInitialState } from '../../../types/reducer-types';
import DeletePopeUp from '../../../components/DeletePopeUp';
// import UserSidebar from '../../../components/user/UserSidebar';
import AdminSidebar from '../../../components/admin/AdminSidebar';

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
  status: string;
  _id: string;
}

interface OrderData {
  _id: string;
  userId: string;
  products: Product[];
  address: Address[];
  paymentMethod: string;
  paymentStatus: boolean;
  
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

const CustomersProducts = () => {
  

  const { orderId, userId } = useParams();

 

  const [rows, setRows] = useState<DataType[]>([]);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productDeletePopUp, setProductDeletePopUp] = useState(false);
  // const [loading, setLoading] = useState(true);

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

  // const handleCancelProduct = (orderId: string, productId: string) => {
  //   setSelectedOrderId(orderId);
  //   setSelectedProductId(productId);
  //   setProductDeletePopUp(true);
  // };

  const handlePopUpCancel = () => {
    setProductDeletePopUp(false);
    setSelectedOrderId(null);
    setSelectedProductId(null);
  };

  const handlePopUpDelete = async () => {
    try {
      const response = await api.put(
        `/order/cancel/${selectedOrderId}/product/${selectedProductId}`
      );
      if (response.data.success) {
        console.log('Product canceled:', selectedProductId, 'from order:', selectedOrderId);
        fetchUserOrders();
      } else {
        console.error('Failed to cancel product:', response.data.error);
      }
    } catch (error) {
      console.error('Error canceling product:', error);
    } finally {
      setProductDeletePopUp(false);
      setSelectedOrderId(null);
      setSelectedProductId(null);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  useEffect(() => {
    const singleOrder = userOrders.find((order) => order._id === orderId);

    console.log(singleOrder);
    

    if (singleOrder) {
      const newRows: DataType[] = singleOrder.products.map((product) => ({
       
        orderId: singleOrder._id,
        photo: (
          <img
            src={`${server}/${product.productImage[0]?.replace(/ /g, '%20')}`}
            alt={product.productName}
          />
        ),
        name: product.productName,
        price: product.price,
        quantity: product.quantity,
        status: (
          <p>
            <span className={getStatusColor(product.status)}>{product.status}</span>
          </p>
        ),
        cancelAction: (
        //   <button
        //     className='bg-red-500 text-white px-4 py-2 rounded'
        //     onClick={() => handleCancelProduct(singleOrder._id, product.productId)}
        //   >
        //     Cancel
        //   </button>

        <Link className='w-full'  to={`/admin/customer/${orderId}/${product.productId}/manage`} >Manage</Link>

        ),
      }));

      setRows(newRows);
    }
  }, [userOrders, orderId]);

  const Table = TableHOC<DataType>(columns, rows, 'dashboard-product-box', 'Orders', rows.length > 6)();

  return (
    <div className="admin-container">
      
      <AdminSidebar />
      <main>{Table}</main>
      {productDeletePopUp && (
        <DeletePopeUp
          onClose={handlePopUpCancel}
          onConfirm={handlePopUpDelete}
          message="Are you sure you want to cancel this product?"
        />
      )}
    </div>
  );
};

export default CustomersProducts;
