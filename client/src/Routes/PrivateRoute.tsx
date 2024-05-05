
// import React from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';
// import { isAuthenticated } from './auth';

// const PrivateRoute = ({ element: Element, roles, ...rest }) => (
 

//   <Route {...rest} element={(
//     isAuthenticated() ? (
//       // Check if the user's role is allowed for the route
//       roles.includes(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role) ? (
//         // Check role and navigate accordingly
//         JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role === 'admin' ? (
//           <Navigate to='/admin/dashboard' />
//           ) : (
//             <Navigate to='/home' />
//             )
//             ) : (
//               <Navigate to='/unauthorized' />
//               )
//               ) : (
//                 <Navigate to='/login' />
//                 )
//                 )} />
             


// );

// export default PrivateRoute;











// import { Route, Navigate, Outlet } from 'react-router-dom';
// import { isAuthenticated } from './auth';

// const PrivateRoute = ({ roles, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated() ? (
//         // Check if the user's role is allowed for the route
//         roles.includes(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role) ? (
//           // If allowed, render the nested routes
//           <Outlet />
//         ) : (
//           // If role not allowed, navigate to unauthorized page
//           <Navigate to='/unauthorized' />
//         )
//       ) : (
//         // If not authenticated, navigate to login page
//         <Navigate to='/login' />
//       )}
//     />
//   );
// };

// export default PrivateRoute;


import {  Navigate, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import  {jwtDecode } from 'jwt-decode';
import {  Outlet } from "react-router-dom";


const PrivateRoute = ({  requiredRole, children }) => {
  const navigate = useNavigate();

  
  const isAuthenticated = !!localStorage.getItem('token'); 
  

  const token = Cookies.get("token");

  if (!token) {
    
    return <Navigate to="/login" />;
  }

  console.log(token)
  

  const user = jwtDecode(token);

  // @ts-ignore
  const userRole = user?.role

  console.log("adminRout:",userRole)

  if (!isAuthenticated || userRole !== requiredRole) {
    
    navigate('/login');
    return null;
  }

  // return <Route {...rest} element={<Component />} />;
  return children || <Outlet/>
};

export default PrivateRoute;