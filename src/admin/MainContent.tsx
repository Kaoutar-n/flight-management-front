import AdminAirplanes from "./AdminAirplanes";
import AdminAirport from "./AdminAirport";
import AdminCrew from "./AdminCrew";
import AdminDashboard from "./AdminDashboard";
import AdminFlights from "./AdminFlights";
import AdminTopbar from "./AdminTopbar";

interface MainContentProps {
    selectedItem: string;
  }

function MainContent({selectedItem}: MainContentProps){
    const renderContent = () => {
        switch (selectedItem) {
          case "Dashboard":
            return <AdminDashboard></AdminDashboard>;
          case "Flights":
            return <AdminFlights></AdminFlights>;
          case "Airports":
            return <AdminAirport></AdminAirport>;
          case "Airplanes":
            return <AdminAirplanes></AdminAirplanes>;
          
          default:
            return <h1>Please select an item from the sidebar.</h1>;
        }
    };
    return <div>
         <AdminTopbar title={selectedItem}></AdminTopbar>
        <div className="mainContentdiv">
        {renderContent()}
        </div>
        </div>;

}
export default MainContent;