import { ReactElement, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  avatar: ReactElement;
  username: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}



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
        onClick={() => handleBlock(row.original.id, row.original.isBlocked)}
      >
        {row.original.isBlocked ? 'Unblock' : 'Block'}
      </button>
    ),
  },
];




const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: Array<DataType> = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    username: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    username: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>(arr);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
