import  { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import api from "../../../api";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";

import expired from "../../../assets/expired.png";

// import expired from "../../../assets/expired_black.png";
const CouponPage = () => {
  const [couponData, setCouponData] = useState([]);

  const currentDate = new Date();

  console.log("currentDate:",currentDate);
  

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get("/coupon/admin/get");
        console.log(response.data.data);
        setCouponData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupons();
  }, []);

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    // You can add additional UI feedback here if needed
    console.log("Coupon code copied to clipboard:", code);
  };

  const [copiedIndex, setCopiedIndex] = useState(-1);

  const deleteHandler = async (couponId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this coupon?"
    );
    if (confirmDeletion) {
      try {
        console.log(couponId);

        const response = await api.delete(`/coupon/delete/${couponId}`);

        if (response.status === 200) {
          toast.success("Coupon deleted successfully");

          setCouponData(response.data.data);
        } else {
          console.error("Error deleting Coupon");
          // setError("Failed to delete Coupon");
          toast.error("Failed to delete Coupon");
        }
      } catch (error) {
        console.error("Error deleting Coupon", error);
        // setError("Failed to delete Coupon");
        toast.error("Failed to delete Coupon");
      }
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <Link to="/admin/coupon/add" className="create-product-btn">
          <FaPlus />
        </Link>

        <h1>Coupon</h1>

        <div className="mt-20 space-y-3  max-h-[550px] overflow-auto rounded-lg border bg-white px-2 py-4 sm:px-6 custom-scrollbar">
          {couponData.length > 0 &&
            couponData.map((coupon, index) => (
              <div className="container mx-auto   " key={index}>
                <div className="bg-gradient-to-br  mb-5 from-purple-600 to-indigo-600 text-white text-center py-7 px-20 rounded-lg shadow-md relative">
                  <h3 className="text-xl font-semibold mb-4">
                    {`${coupon.discount}%`} {coupon.couponName}
                  </h3>
                  <div className="flex items-center space-x-2 mb-6">
                    <span
                      id="cpnCode"
                      className={`border-dashed border text-white px-4 py-2 rounded-l `}
                    >
                      {coupon.couponCode}
                    </span>
                    <span
                      id="cpnBtn"
                      className={`  w-40  px-4 py-2 rounded-r cursor-pointer ${
                        copiedIndex === index
                          ? "bg-black"
                          : "bg-white  text-purple-600 border-white border "
                      }  `}
                      onClick={() => {
                        copyCouponCode(coupon.couponCode);
                        setCopiedIndex(index);
                        setTimeout(() => setCopiedIndex(-1), 1500); // Reset copied index after 1.5 seconds
                      }}
                    >
                      {copiedIndex === index ? "Copied" : "Copy Code"}
                    </span>
                  </div>
                  <p className="text-sm">
                    Valid Till: {coupon.formattedDateTime}
                  </p>
                  
                  

                  {new Date(coupon.expiryDate) < currentDate && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-32">
                      <img className="h-[160px]" src={expired} alt="Expired" />
                    </div>
                  )}

                  <div className="w-full flex  justify-end">
                    <button
                      className=" bg-slate-700  text-white hover:bg-black  px-10 rounded  py-2"
                      onClick={() => {
                        deleteHandler(coupon._id);
                      }}
                      // disabled={updating}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                  <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                </div>
              </div>
            ))}

          {/* <CouponCard /> */}
        </div>
      </main>
    </div>
  );
};

export default CouponPage;
