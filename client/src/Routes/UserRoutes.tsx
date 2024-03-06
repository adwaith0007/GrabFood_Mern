import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const MenuPage = lazy(() => import("../pages/userPages/MenuPage"));
const CartPage = lazy(() => import("../pages/userPages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/userPages/CheckoutPage"));
const ProductDetailsPage = lazy( () => import("../components/ProductDetailsPage"));

const UserProfile = lazy(() => import("../pages/userPages/userDashbord/UserProfile"));
const OrderPage = lazy(() => import("../pages/userPages/userDashbord/OrderPage"));
const ManageAddressPage = lazy(() => import("../pages/userPages/userDashbord/ManageAddressPage"));
const FavouritesPage = lazy(() => import("../pages/userPages/userDashbord/FavouritesPage"));
const MyWalletPage = lazy(() => import("../pages/userPages/userDashbord/MyWalletPage"));
const ProfileUpdate = lazy(() => import("../pages/userPages/(logged-in)/ProfileUpdate"));

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/menu" element={<MenuPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/checkout" element={<CheckoutPage />}></Route>
      <Route path="user/profile" element={<UserProfile />}></Route>
      <Route path="user/orders" element={<OrderPage />}></Route>
      <Route path="user/address" element={<ManageAddressPage />}></Route>
      <Route path="user/favourites" element={<FavouritesPage />}></Route>
      <Route path="user/wallet" element={<MyWalletPage />}></Route>

      <Route path="/profile/Update" element={<ProfileUpdate />}></Route>
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default UserRoutes;
