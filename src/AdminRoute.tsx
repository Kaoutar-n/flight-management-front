import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  exp: number; 
}


interface AdminRouteProps {
  children: ReactNode; 
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    
    return <Navigate to="/login" replace />;
  }

  try {
   
    const decodedToken: { authorities: string[] } = jwtDecode(authToken);

    const role = decodedToken.authorities[0];
    if (role !== "ADMIN") {
      
      return <Navigate to="/not-authorized" replace />;
    }

   
   
  } catch (error) {
    console.error("Invalid token:", error);
    
    return <Navigate to="/login" replace />;
  }

  
  return <>{children}</>;
};

export default AdminRoute;
