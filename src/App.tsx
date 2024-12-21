import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";

// import './styles/main.css'
import Presentaion from "./Presentation";
import MainHome from "./mainHome/MainHome";
import ValidateAccount from "./login/ValidateAccount";
import Profile from "./mainHome/Profile";
import ProtectedRoute from "./ProtectedRoute ";
import Booking from "./mainHome/Booking";
import AdminHome from "./admin/AdminHome";
import BookingForm from "./mainHome/BookingForm";
import AdminRoute from "./AdminRoute";



function App(){
const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Presentaion/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       
       <Route path="/register" element={<Register/>}></Route>
       
       
       <Route path="/booking" element={<ProtectedRoute><MainHome/></ProtectedRoute>}></Route>

       <Route path="/book-flight" element={<ProtectedRoute><BookingForm/></ProtectedRoute>}></Route>
       <Route path="/adminhome" element={<AdminRoute><AdminHome/></AdminRoute>}></Route>

       {/* <Route path="/adminehome" element={<AdminHome></AdminHome>}></Route> */}

       {/* <Route path="/adminhome" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}></Route> */}

       
       {/* <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/booking" replace /> : <Navigate to="/" replace />
          }
        /> */}
       
       <Route path="/activate" element={<ValidateAccount/>}></Route>
       <Route path="/profile" element={<Profile/>}></Route>

   
    </Routes>
   </BrowserRouter>
  )
}

export default App;