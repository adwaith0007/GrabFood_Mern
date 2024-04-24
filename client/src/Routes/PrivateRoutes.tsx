import { Outlet, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import axios from "axios";
import server from "../server";
import { useEffect } from "react";
// import api from "../api"

// eslint-disable-next-line react/prop-types
export default function PrivateRoutes({ role }) {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .post(
          `${server}${role === "admin" ? "/admin/" : "/"}isUserBlocked`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message);
            Cookie.remove("token");
            axios
              .get(
                `${server}/${role === "admin" ? "admin/logout" : "logout"}`,
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log(res);
                navigate(`/${role === "admin" ? "admin" : "user"}/login`);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    } catch (error) {
      console.log("error while checking user is blocked", error);
    }
  }, [navigate, role]);

  if (!Cookie.get("token")) toast.error("Please login");
  return Cookie.get("token") ? <Outlet /> : <Navigate to={"/user/home"} />;
}