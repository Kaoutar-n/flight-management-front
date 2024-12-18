

import { CgMenu } from "react-icons/cg";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

import profile from "../assets/profile.jpg"
import { useState } from "react";
import { useNavigate } from "react-router";

function TopBar(){
  let navigate=useNavigate();
    const [activeDropdown, setActiveDropdown] = useState<"tripType" | "classType">("tripType");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [tripType, setTripType] = useState<string>("One-way");
    const [classType, setClassType] = useState<string>("Economy Class");
    const [passengers, setPassengers] = useState<string>("");

    const handleDropdownChange = (dropdownType: "tripType" | "classType", value: string): void => {
        if (dropdownType === "tripType") {
          setTripType(value);
        } else if (dropdownType === "classType") {
          setClassType(value);
        }
        setActiveDropdown(dropdownType); 
        console.log(`Selected ${dropdownType}:`, value);
      };
      const handlePassengersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        
        if (/^\d*$/.test(value)) {
          setPassengers(value);
        }
      };
      const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
      };
      const handleProfileClick = () => {
        navigate("/profile");
        
      };
      const handleLogoutClick = () => {
        console.log("Logout clicked");
        
      };

    return (
        <div className="header">
      <div className="logo">BeeFlights</div>
      <div className="menu">
       
        <div
          className={`custom-dropdown ${
            activeDropdown === "tripType" ? "test" : ""
          }`}
          onClick={() => setActiveDropdown("tripType")}
        >
          <div className="dropdown-selected">
            {tripType} <IoIosArrowDropdownCircle className="icon" />
          </div>
          {activeDropdown === "tripType" && (
            <ul className="dropdown-options">
              <li onClick={() => handleDropdownChange("tripType", "One-way")}>
                One-way
              </li>
              <li onClick={() => handleDropdownChange("tripType", "Round-trip")}>
                Round-trip
              </li>
            </ul>
          )}
        </div>

        <div
          className={`custom-dropdown ${
            activeDropdown === "classType" ? "test" : ""
          }`}
          onClick={() => setActiveDropdown("classType")}
        >
          <div className="dropdown-selected">
            {classType} <IoIosArrowDropdownCircle className="icon" />
          </div>
          {activeDropdown === "classType" && (
            <ul className="dropdown-options">
              <li onClick={() => handleDropdownChange("classType", "Economy Class")}>
                Economy Class
              </li>
              <li onClick={() => handleDropdownChange("classType", "Business Class")}>
                Business Class
              </li>
              <li onClick={() => handleDropdownChange("classType", "First Class")}>
                First Class
              </li>
            </ul>
          )}
        </div>
        <input
          className="input"
          id="input"
          type="text"
          placeholder="Passengers"
          value={passengers}
          onChange={handlePassengersChange}
        />
      </div>

      <div className="profile-side">
      <CgMenu className="icon" onClick={toggleDropdown} />

      <img src={profile} className="pro-avatar" alt="Profile" />

      {isDropdownVisible && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={handleProfileClick}><CgProfile />
            Profile</li>
            <li onClick={handleLogoutClick}><IoLogOutOutline />
            Logout</li>
          </ul>
        </div>
      )}
    </div>
    </div>
    )
}

export default TopBar;