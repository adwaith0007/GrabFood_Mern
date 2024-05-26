


import { useEffect, useState, useMemo } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

import TableHOC from "../../../components/admin/TableHOC";
import api from "../../../api";
import { FaPlus } from "react-icons/fa";
const server = import.meta.env.VITE_SERVER;

interface DataType {
  photo: React.ReactElement;
  name: string;
  action: React.ReactElement;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`/category/get/admin`);
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      } catch (error) {
        toast.error("Error while loading categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const loadingRows = useMemo(
    () =>
      Array(10)
        .fill({})
        .map(() => ({
          photo: (
            <div className="flex justify-start items-center">
              <Skeleton  height={50} width={50} />
            </div>
          ),
          name: <Skeleton width={100} />,
          action: <Skeleton width={50} />,
        })),
    []
  );

  useEffect(() => {
    const newRows = loading
      ? loadingRows
      : categoryList.map((item) => ({
          photo: (
            <img
              src={`${server}/${item.categoryImage[0]?.replace(/ /g, "%20")}`}
              alt={item.category}
              className="w-12 h-12 object-cover rounded-full"
            />
          ),
          name: item.category,
          action: <Link to={`/admin/category/${item._id}`}>Manage</Link>,
        }));

    setRows(newRows);
  }, [categoryList, loading, loadingRows]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Category",
    rows.length > 6
  )();

  return (
    <div className="h-full">
      <main className="h-full">{Table}</main>
      <Link to="/admin/category/add" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Category;