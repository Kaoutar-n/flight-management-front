

import { CgMenu } from "react-icons/cg";

import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

import profile from "../assets/profile.jpg"
import { useState } from "react";
import { useNavigate } from "react-router";


interface AdminTopbarProps {
    title: string; // The string parameter
  }



function AdminTopbar({ title }: AdminTopbarProps){


    let navigate=useNavigate();
    
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    

      const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
      };
      const handleProfileClick = () => {
        navigate("/profile");
        
      };
      const handleLogout = () => {
        
        localStorage.removeItem("authToken");
        navigate("/login");
      };

    return (
        <div className="header">
      <div className="logo">{title}</div>
   
          

       

      <div className="profile-side">
      <CgMenu className="icon" onClick={toggleDropdown} />

      <img src={profile} className="pro-avatar" alt="Profile" />

      {isDropdownVisible && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={handleProfileClick}><CgProfile />
            Profile</li>
            <li onClick={handleLogout}><IoLogOutOutline />
            Logout</li>
          </ul>
        </div>
      )}
    </div>
    </div>
    )



}
export default AdminTopbar;