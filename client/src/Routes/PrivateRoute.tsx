


// import {  Navigate, useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";
// import  {jwtDecode } from 'jwt-decode';
// import {  Outlet } from "react-router-dom";


// const PrivateRoute = ({  requiredRole, children }) => {
//   const navigate = useNavigate();

  
//   const isAuthenticated = !!localStorage.getItem('token'); 
  

//   const token = Cookies.get("token");

//   if (!token) {
    
//     return <Navigate to="/login" />;
//   }

//   console.log(token)
  

//   const user = jwtDecode(token);

//   // @ts-ignore
//   const userRole = user?.role

//   console.log("adminRout:",userRole)

//   if (!isAuthenticated || userRole !== requiredRole) {
    
//     navigate('/login');
//     return null;
//   }

//   // return <Route {...rest} element={<Component />} />;
//   return children || <Outlet/>
// };

// export default PrivateRoute;