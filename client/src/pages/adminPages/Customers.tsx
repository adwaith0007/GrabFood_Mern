import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getCustomers } from '../../helper/helper';
import axios from 'axios';
import { server } from '../../server';
import toast from "react-hot-toast";




const columns = [
  {
    Header: 'S.NO',
    accessor: (row, index) => index + 1,
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
  {
    Header: 'BLOCK',
    accessor: 'block',
    Cell: ({ row }) => (
      <button
        className={`px-2 py-1 ${
          row.original.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
        onClick={() => handleBlock(row.original.id, row.original.isBlocked        )}
      >
        {row.original.isBlocked ? 'Unblock' : 'Block'}
      </button>
    ),
  },
];










const Customers = () => {





  const [customerData, setCustomerData] = useState([]);



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
  

  

  const handleBlock = async (id, isBlocked) => {
    try {
      console.log("hi");
      
      
      const response = await axios.put(
      `http://localhost:5000/api/admin/customers/${id}`,
      { blocked: !isBlocked }
    );
      // const response = await apiCallToUpdateBlockStatus(id, !isBlocked);
      console.log(response); // Log the API response
  
      // Update the local state with the new data after block/unblock
      const updatedCustomerData = customerData.map((customer) =>
        customer.id === id ? { ...customer, blocked: !isBlocked } : customer
      );
      setCustomerData(updatedCustomerData);
    } catch (error) {
      console.error('Error updating block status:', error);
    }
  };


  
  
  
  
  
 

  // Handle block/unblock action
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: customerData, // Use the fetched customer data
  });

  return (
    <div className='container mx-auto mt-8'>
      <table {...getTableProps()} className='min-w-full bg-white border border-gray-300'>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} className='bg-gray-100'>
              {hg.headers.map((header) => (
                <th
                  {...header.getHeaderProps()}
                  className='p-2 font-semibold text-left border border-gray-300'
                >
                  {header.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='hover:bg-gray-50'>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className='p-2 border border-gray-300'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};



export default Customers;