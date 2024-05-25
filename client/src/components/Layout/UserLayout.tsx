
import { Outlet } from 'react-router-dom' 
import UserSidebar from '../user/UserSidebar'

const UserLayout = () => {
  return (
    <div className="admin-container ">
    <UserSidebar />
    <main className="admin-main-content  h-screen ">
      <Outlet />
    </main>
  </div>
  )
}

export default UserLayout