import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";

// import { OrderItem } from "../../../models/types";

const server = import.meta.env.VITE_SERVER;
import api from '../../../api';

const TransactionManagement = () => {
  const { orderId, productId } = useParams();
  const [userOrderDetails, setUserOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}/${productId}`);
        const orderDetails = response.data;
        setUserOrderDetails(orderDetails);
        console.log(orderDetails);
      } catch (error) {
        console.error('Error fetching order details:', error.response ? error.response.data : error.message);
      }
    };

    
    if (orderId && productId) {
      fetchOrderDetails();
    }
  }, [orderId, productId]);

  const updateHandler = async () => {
   
    try {
      
      await api.put(`/orders/${orderId}/product/${productId}`, {
        status: "Delivered",
      });

     
      setUserOrderDetails((prev) => ({
        ...prev,
        status: "Delivered",
      }));
    } catch (error) {
      console.error('Error updating order status:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section style={{ padding: "2rem" }}>
          <h2>Order Items</h2>
          <ProductCard
            name={userOrderDetails?.productName}
            photo={`${server}/${userOrderDetails?.productImage}`}
            quantity={userOrderDetails?.quantity}
            price={userOrderDetails?.price}
          />
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn">
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {userOrderDetails?.userName}</p>
          <p>Address: {userOrderDetails?.address[0]?.street}</p>
          <h5>Amount Info</h5>
          <p>Subtotal: {userOrderDetails?.subtotal}</p>
          <p>Shipping Charges: {userOrderDetails?.shippingCharges}</p>
          <p>Tax: {userOrderDetails?.tax}</p>
          <p>Discount: {userOrderDetails?.discount}</p>
          <p>Total: {userOrderDetails?.total}</p>
          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                userOrderDetails?.status === "Delivered"
                  ? "purple"
                  : userOrderDetails?.status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {userOrderDetails?.status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity }) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    {/* <Link to={`/product/${productId}`}>{name}</Link> */}
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;