import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("authToken");
    console.log("Auth token:", token);
    console.log("Redirecting?", !token);
  
    return token ? children : <Navigate to="/login" replace />;
  };
export default ProtectedRoute;
