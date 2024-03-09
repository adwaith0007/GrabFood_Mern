import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const Products = lazy(() => import("../pages/admin/products"));
const Transaction = lazy(() => import("../pages/admin/transaction"));
const Barcharts = lazy(() => import("../pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("../pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("../pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("../pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("../pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("../pages/admin/apps/toss"));
const NewProduct = lazy(() => import("../pages/admin/management/newproduct"));
const NewCategory = lazy(() => import("../pages/admin/management/newcategory"));
const ProductManagement = lazy(
  () => import("../pages/admin/management/productmanagement")
);
const CategoryManagement = lazy(
  () => import("../pages/admin/management/categorymanagement")
);
const TransactionManagement = lazy(
  () => import("../pages/admin/management/transactionmanagement")
);
import Category from "../pages/admin/Category";
import CustomersProducts from "../pages/adminPages/CustomersProducts";

const LoginPage = lazy(() => import("../pages/adminPages/LoginPage"));
const Customers = lazy(() => import("../pages/adminPages/Customers"));
const SignupPage = lazy(() => import("../pages/adminPages/SignupPage"));
const AddCategory = lazy(() => import("../pages/adminPages/AddCategory"));
const AddProduct = lazy(() => import("../pages/adminPages/AddProduct"));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/signup" element={<SignupPage />}></Route>

      <Route path="/admin/category/add" element={<AddCategory />}></Route>
      <Route path="/admin/product/add2" element={<AddProduct />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<Products />} />
      <Route path="/category" element={<Category />} />
      <Route path="/customer" element={<Customers />} />
      <Route path="customer/:customerId/products" element={<CustomersProducts />} />  
      <Route path="/transaction" element={<Transaction />} />

      <Route path="/admin" element={<LoginPage />}></Route>

      {/* Charts */}
      <Route path="/chart/bar" element={<Barcharts />} />
      <Route path="/chart/pie" element={<Piecharts />} />
      <Route path="/chart/line" element={<Linecharts />} />
      {/* Apps */}
      <Route path="/app/coupon" element={<Coupon />} />
      <Route path="/app/stopwatch" element={<Stopwatch />} />
      <Route path="/app/toss" element={<Toss />} />

      {/* Management */}
      <Route path="/product/new" element={<NewProduct />} />

      <Route path="/category/new" element={<NewCategory />} />

      <Route path="/product/:id" element={<ProductManagement />} />

      <Route path="/category/:id" element={<CategoryManagement />} />

      <Route
        path="/transaction/:id"
        element={<TransactionManagement />}
      />
    </Routes>
  );
};

export default AdminRoutes;
