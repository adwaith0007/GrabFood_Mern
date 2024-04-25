import  { useEffect, useState } from "react";

import { ReactElement } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import api from '../../../api';
const server = import.meta.env.VITE_SERVER;
interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  category: string;
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
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/get");
        if (response.data.success) {
          setProductList(response.data.data);
        }
      } catch (error) {
        console.error("Error while loading products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update rows with the data from productList
    const newRows:any = productList.map((item) => ({

      
      photo: (
        <img
          src={`${server}/${item.productImage[0]?.replace(/ /g, "%20")}`}
          alt={item.name}
        />
      ),
      name: item.productName,
      price: `₹${item.price}`,
      category: item.category,
      action: <Link to={`/admin/product/${item._id}`}>Manage</Link>,
    }));

    setRows(newRows);
  }, [productList]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/product/add" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;