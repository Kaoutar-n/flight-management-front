import { useState } from "react";
import { FaHome, FaPlane, FaMapMarkerAlt, FaRocket, FaUsers } from "react-icons/fa"; // Example: React Icons

interface SidebarProps {
  onClick: (item: string) => void;
}

function SideBar({ onClick }: SidebarProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const items = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Flights", icon: <FaPlane /> },
    { name: "Airports", icon: <FaMapMarkerAlt /> },
    { name: "Airplanes", icon: <FaRocket /> },
    { name: "Crew", icon: <FaUsers /> },
  ];

  const handleClick = (item: string) => {
    setSelectedItem(item);
    onClick(item);
  };

  return (
    <>
      <div className="sideLogo">
        <div className="sideImage">
          <img src="src/assets/BeeFlights.png" alt="Bee Flights Logo" />
        </div>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={selectedItem === item.name ? "selected-item" : ""}
           
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SideBar;
