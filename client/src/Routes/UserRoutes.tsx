import  { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PaymentPage from "../pages/userPages/PaymentPage";
import MyOrderPage from "../pages/userPages/userDashbord/MyOrderPage";
import OrderProductPage from "../pages/userPages/userDashbord/management/OrderProductPage";
import BestProducts from "../pages/userPages/BestProducts";

const MenuPage = lazy(() => import("../pages/userPages/MenuPage"));
const CartPage = lazy(() => import("../pages/userPages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/userPages/CheckoutPage"));
const ProductDetailsPage = lazy( () => import("../components/ProductDetailsPage"));

const UserProfile = lazy(() => import("../pages/userPages/userDashbord/UserProfile"));

const ManageAddressPage = lazy(() => import("../pages/userPages/userDashbord/ManageAddressPage"));
const FavouritesPage = lazy(() => import("../pages/userPages/userDashbord/FavouritesPage"));
const MyWalletPage = lazy(() => import("../pages/userPages/userDashbord/MyWalletPage"));
const ProfileUpdate = lazy(() => import("../pages/userPages/(logged-in)/ProfileUpdate"));

const UserRoutes = () => {
  return (
    <>
      
    <Routes>
     

        <Route path="/menu" element={<MenuPage />}></Route>
     
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/checkout" element={<CheckoutPage />}></Route>
      <Route path="user/profile" element={<UserProfile />}></Route>
      
      <Route path="user/orders" element={<MyOrderPage />}></Route>
      <Route path="user/address" element={<ManageAddressPage />}></Route>
      <Route path="user/favourites" element={<FavouritesPage />}></Route>
      <Route path="user/wallet" element={<MyWalletPage />}></Route>
      <Route path="/payment" element={<PaymentPage/>}></Route>  
      <Route path="/best_products" element={<BestProducts/>}></Route>  
      <Route path="user/orders/:orderId/product" element={<OrderProductPage />} />    

      <Route path="/profile/Update" element={<ProfileUpdate />}></Route>
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
    </Routes>
    </>
  );
};

export default UserRoutes;
