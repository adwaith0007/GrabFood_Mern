import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
// import "../../../App.scss";
// @import '../../App.scss'

const AdminLayout = () => {
  return (
    <div className="admin-container ">
    <AdminSidebar />
    <main className="admin-main-content  h-screen ">
      <Outlet />
    </main>
  </div>
  );
};

export default AdminLayout;