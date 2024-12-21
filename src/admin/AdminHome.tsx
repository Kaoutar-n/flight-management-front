import { useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";


function AdminHome(){
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard");

  const handleSidebarClick = (item: string) => {
    setSelectedItem(item);
  }


    return(
      <div className="adminHome">
      <div className="adminSidebar">
        <SideBar onClick={handleSidebarClick} />
      </div>

      <div className="adminMain">
        <MainContent selectedItem={selectedItem} />
      </div>
    </div>
    );
}


export default AdminHome;