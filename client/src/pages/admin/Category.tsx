import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactElement} from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import toast, { Toaster } from "react-hot-toast";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  photo: ReactElement;
  name: string;
  // price: number;
  // stock: number;
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
  // {
  //   Header: "Price",
  //   accessor: "price",
  // },
  // {
  //   Header: "Stock",
  //   accessor: "stock",
  // },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: Array<DataType> = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Category = () => {


  const [categoryList, setCategoryList] = useState([]);
  const [rows, setRows] = useState<DataType[]>(arr);


  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/api/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error white while loading categories");
      console.log(error);
    }


  }, []);



  useEffect(() => {
    // Update rows with the data from productList
    const newRows: DataType[] = categoryList.map((item) => ({

      
      photo: (
        <img
          src={`http://localhost:5000/${item.categoryImage[0]?.originalname.replace(/ /g, "%20")}`}
          alt={item.category}
        />
      ),
      name: item.category,
      
      // category: item.category,
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
        <Link to="/admin/category/new" className="create-product-btn">
          <FaPlus />
        </Link>
      </div>
    );
  };

export default Category