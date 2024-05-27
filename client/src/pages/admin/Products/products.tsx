

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { FaPlus } from "react-icons/fa";
import api from "../../../api";
import TableHOC from "../../../components/admin/TableHOC";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const server = import.meta.env.VITE_SERVER;

interface DataType {
  photo: JSX.Element;
  name: JSX.Element
  price: JSX.Element;
  category: JSX.Element;
  action: JSX.Element;
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
  const [productList, setProductList] = useState<any[]>([]);
  const [rows, setRows] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/get");
        if (response.data.success) {
          setProductList(response.data.data);
        }
      } catch (error) {
        console.error("Error while loading products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading) return; // Skip processing if still loading

    // Update rows with the data from productList
    const newRows = productList.map((item) => ({
      photo: (
        <LazyLoadImage
        loading="lazy"
          src={`${server}/${item.productImage[0]?.replace(/ /g, "%20")}`}
          alt={item.name}
        />
      ),
      name: item.productName,
      price:
        item.discountPrice < item.price && item.discountPrice ? (
          <p>
            <span className="text-xl font-semibold text-slate-900">
              ₹{item.discountPrice}
            </span>
            <span className="text-sm text-slate-900 line-through">
              ₹{item.price}
            </span>
          </p>
        ) : (
          <p>
            <span className="text-xl font-semibold text-slate-900">
              ₹{item.price}
            </span>
          </p>
        ),
      category: item.category,
      action: <Link to={`/admin/product/${item._id}`}>Manage</Link>,
    }));

    setRows(newRows);
  }, [productList, loading]);

  const loadingSkeletonRows = useMemo(
    () =>
      Array.from({ length: 6 }).map(() => ({
        photo: <Skeleton width={80} height={80} />,
        name: <Skeleton width={120} />,
        price: <Skeleton width={60} />,
        category: <Skeleton width={100} />,
        action: <Skeleton width={60} />,
      })),
    []
  );

  const Table = TableHOC<DataType>(
    columns,
    loading ? loadingSkeletonRows : rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="h-full">
      <main className="h-full">{Table}</main>
      <Link to="/admin/product/add" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
