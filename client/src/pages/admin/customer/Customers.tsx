


import  { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';
import TableHOC from '../../../components/admin/TableHOC';
import api from '../../../api';

const columns = [
  {
    Header: 'S.NO',
    accessor: 'no'
  },
  {
    Header: 'USERNAME',
    accessor: 'username',
  },
  {
    Header: 'EMAIL',
    accessor: 'email',
  },
  {
    Header: 'PHONE',
    accessor: 'phone',
  },
  { Header:(<div className='flex justify-center ' >All Orders</div> ) , accessor: 'orderDetails' },
  {
    Header: 'BLOCK',
    accessor: 'block', 
  },
];

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/admin/customers`)
      .then((res) => {
        if (res.data.success) {
          setCustomerData(res.data.data);
        } else {
          toast.error("Error while loading customers");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newRows = customerData.map((item, index) => ({
      no: index + 1,
      username: item.username,
      email: item.email,
      phone: item.phone,
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
      const response = await api.put(`/admin/customers?id=${id}`, { isBlocked: !isBlocked });
      const updatedCustomerData = customerData.map((customer) =>
        customer._id === id ? { ...customer, isBlocked: !isBlocked } : customer
      );
      if (response.data.success) {
        
        setCustomerData(updatedCustomerData);
        toast.success(`Customer ${isBlocked ? 'Unblocked' : 'Blocked'} successfully`);
      }
    } catch (error) {
      console.error('Error updating block status:', error);
      toast.error(error.response.data.message);
    }
  };

  const loadingRows = useMemo(
    () =>
      Array(10)
        .fill({})
        .map(() => ({
          no: <Skeleton width={30} />,
          username: <Skeleton width={100} />,
          email: <Skeleton width={100} />,
          phone: <Skeleton width={100} />,
          orderDetails: <Skeleton width={100} />,
          block: <Skeleton width={100} />,
        })),
    []
  );

  const Table = TableHOC(
    columns,
    loading ? loadingRows : rows,
    "dashboard-product-box",
    "Products",
    !loading && rows.length > 6
  )();

  return (
    <main className="h-full">
      {Table}
    </main>
  );
};

export default Customers;