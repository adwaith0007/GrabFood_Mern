import  { useEffect, useState } from "react";
import { Column } from 'react-table';

import { ReactElement } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import api from '../../../api';
const server = import.meta.env.VITE_SERVER;

interface DataType {
  photo: ReactElement;
  name: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    try {
      api.get(`/category/get/admin`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const newRows: DataType[] = categoryList.map((item) => ({
      photo: (
        <img
          src={`${server}/${item.categoryImage[0]?.replace(/ /g, "%20")}`}
          alt={item.category}
        />
      ),
      name: item.category,
      action: <Link to={`/admin/category/${item._id}`}>Manage</Link>,
    }));
    setRows(newRows);
  }, [categoryList]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Category",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/category/add" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Category;