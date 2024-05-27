import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminLayout from "../components/Layout/AdminLayout";

const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const Products = lazy(() => import("../pages/admin/products/product"));

const Transaction = lazy(() => import("../pages/admin/transaction"));

const ProductManagement = lazy(
  () => import("../pages/admin/products/ProductManagement")
);
const CategoryManagement = lazy(
  () => import("../pages/admin/category/CategoryManagement")
);
const TransactionManagement = lazy(
  () => import("../pages/admin/Transaction/TransactionManagement")
);
const Customers = lazy(() => import("../pages/admin/customer/Customers"));

import Category from "../pages/admin/category/Category";
import CustomersOrder from "../pages/admin/customer/CustomersOrder";
import CustomersProducts from "../pages/admin/Transaction/CustomersProducts";
import CouponPage from "../pages/admin/coupon/CouponPage";
import AddProduct from "../pages/admin/products/AddProduct";
import AddCategory from "../pages/admin/category/AddCategory";
import AddCouponPage from "../pages/admin/coupon/AddCouponPage";
import Orders from "../pages/admin/order/Orders";
import OrderManagement from "../pages/admin/order/OrderManagement";
import SalesReport from "../pages/admin/SalesReport";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/product" element={<Products />} />
          <Route path="/category" element={<Category />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route
            path="customer/:customerId/products"
            element={<CustomersOrder />}
          />
          <Route path="/coupon" element={<CouponPage />} />
          <Route path="/coupon/add" element={<AddCouponPage />} />

          {/* Management */}
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/product/:id" element={<ProductManagement />} />
          <Route path="/category/:id" element={<CategoryManagement />} />
          <Route
            path="/customer/:userId/order/:orderId/product"
            element={<CustomersProducts />}
          />
          <Route
            path="/customer/:orderId/:productId/manage"
            element={<TransactionManagement />}
          />
          <Route path="/orders/:orderId" element={<OrderManagement />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
