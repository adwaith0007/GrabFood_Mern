import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getCustomers } from '../../helper/helper';

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
          row.original.blocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
        onClick={() => handleBlock(row.original.id, row.original.blocked)}
      >
        {row.original.blocked ? 'Unblock' : 'Block'}
      </button>
    ),
  },
];

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch customer data when the component mounts
    async function fetchCustomerData() {
      try {
        const data = await getCustomers();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }

    fetchCustomerData();
  }, []); // Ensure useEffect runs only once on mount

  // Handle block/unblock action
  const handleBlock = async (id, isBlocked) => {
    try {
      // Perform the actual block/unblock logic here
      // For demo purposes, let's assume you have an API endpoint for this
      const response = await apiCallToUpdateBlockStatus(id, !isBlocked);
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

// Placeholder function for API call to update block status
const apiCallToUpdateBlockStatus = async (customerId, newBlockStatus) => {
  // Replace this with your actual API call to update block status
  console.log(`Updating block status for customer with ID ${customerId} to ${newBlockStatus}`);
  // Simulating a successful response
  return { success: true, message: 'Block status updated successfully' };
};

export default Customers;