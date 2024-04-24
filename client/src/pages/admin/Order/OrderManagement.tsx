import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
// import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { Link } from "react-router-dom";
// import { OrderItem } from "../../../models/types";
import { useNavigate } from "react-router-dom";

const server = import.meta.env.VITE_SERVER;
import api from "../../../api";

const OrderManagement = () => {
  const { orderId } = useParams();
  const [userOrderDetails, setUserOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        const orderDetails = response.data;
        setUserOrderDetails(orderDetails);
        console.log(orderDetails);
      } catch (error) {
        console.error(
          "Error fetching order details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    console.log(userOrderDetails);

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const approveHandler = async () => {
    try {
      if (userOrderDetails?.orderStatus == "Cancelled") {
        toast.error("Canceled order can't be approved ");
      } else {
        const response = await api.put(`/orders/status/${orderId}`, {
          status: "Delivered",
        });

        if (response.data.success) {
          toast.success(response.data.message);

          setUserOrderDetails((prev) => ({
            ...prev,
            orderStatus: "Delivered",
          }));

         
        navigate("/admin/ordersl,");

        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(
        "Error updating order status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelHandler = async () => {
    try {
      if (userOrderDetails?.orderStatus == "Cancelled") {
        toast.error("Order is already Cancelled");
      } else {
        const response = await api.put(`/orders/status/${orderId}`, {
          status: "Cancelled",
        });

        if (response.data.success) {
          toast.success(response.data.message);

          setUserOrderDetails((prev) => ({
            ...prev,
            orderStatus: "Cancelled",
          }));
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(
        "Error updating order status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section style={{ padding: "2rem" }}>
          <h2>Order Items</h2>
          <p>Id:{orderId}</p>
          {userOrderDetails?.products.map((product) => (
            <ProductCard
              key={product._id} // Assuming '_id' is a unique identifier for each product
              name={product.productName}
              photo={`${server}/${product.productImage[0]}`} // Accessing the first image URL
              quantity={product.quantity}
              price={product.price}
            />
          ))}
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
          <p>Discount: {userOrderDetails?.discountAmount}</p>
          <p>Total: {userOrderDetails?.totalPrice}</p>
          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                userOrderDetails?.orderStatus === "Delivered"
                  ? "purple"
                  : userOrderDetails?.orderStatus === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {userOrderDetails?.orderStatus}
            </span>
          </p>

          {
            userOrderDetails?.orderStatus === "Processing" ? 
            
            <div className="flex m-auto justify-between mt-5 ">
            <button
              className="bg-blue-600 text-white w-[160px]  py-3 rounded"
              onClick={approveHandler}
              >
              Approve
            </button>

            <button
              className="bg-red-600 text-white w-[160px]  py-3 rounded"
              onClick={cancelHandler}
              >
              Cancel
            </button>
          </div>

          :
          <></>
            }
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

export default OrderManagement;
