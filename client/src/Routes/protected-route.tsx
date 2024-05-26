// import { ReactElement } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// interface Props {
//     children?:ReactElement;
//     isAuthenticated: boolean;
//     adminOnly?:boolean;
//     admin?:boolean;
//     redirect?:string;
// }

// const ProtectedRoute = ({isAuthenticated,children,adminOnly,admin,redirect="/login"}:Props) => {

//     if(!isAuthenticated) return <Navigate to={redirect} />;

    

//     if(adminOnly && !admin) return <Navigate to={redirect} />;

//   return children ? children:<Outlet/> ;
// }

// export default ProtectedRoute






import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?:ReactElement;
    isAuthenticated: boolean;
    role?: string;
    adminOnly?: boolean;
    userOnly?: boolean;
    admin?:boolean;
    redirect?:string;
    isuser?:boolean;
}

const ProtectedRoute = ({isAuthenticated,  children,adminOnly,role, userOnly, admin, redirect="/home"}:Props) => {

  

    if (isAuthenticated) {

      console.log("location.pathname:",location.pathname)

      if (location.pathname === '/login'|| location.pathname === '/signup' || location.pathname === '/' ) {
       
        return <Navigate to="/home" />;
      }
      
     
    }
    else{

      if (location.pathname === '/login'   ) {
        
        return children ? children:<Outlet/> ;
      }
      
     
    }

     if (!isAuthenticated) {
      console.log("User not authenticated");
      return <Navigate to="/login" />;
    }
      

    if (userOnly  && role !== "user") {
      return <Navigate to={"/home"} />;
    }

    

    if(adminOnly && !admin) return <Navigate to={redirect} />;

    console.log("outlet")

  return children ? children:<Outlet/> ;
}

export default ProtectedRoute