import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { LuBaggageClaim } from "react-icons/lu";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaDotCircle } from "react-icons/fa";
import { RiPlaneLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import AdminTopbar from "../admin/AdminTopbar";



interface Flight {
    flight_id: number; 
    flightNumber: string; 
    status: string; 
    flight_departure: string; 
    flight_arrival: string;
    basePrice: number; 
    departureFrom: string; 
    arrivalTo: string; 
  }
function BookingForm() {

    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    
    const location = useLocation();
    const navigate = useNavigate();
    const flightId = location.state?.flightId;
    console.log("id",flightId);

    const [formData, setFormData] = useState({
        passengerFirstName: "",
        passengerLastName: "",
        passengerEmail: "",
        numberOfSeats: 0,
        cardId: "",
        phoneNumber: "",
        passportId: ""
       
    });
    const [flight, setFlight] = useState<Flight>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const body = {
            id: 0,
            ...formData,
            flightId, 
        };

        apiClient
            .post("/booking-flight", body,{headers})
            .then(() => {
                alert("Booking successful! Check your email ");
                 
            })
            .catch((error) => {
                console.error("Error during booking:", error);
                alert("Booking failed!");
            });
    };

    useEffect(() => {
        const fetchFlight = async ()=>{
            try{
                const response = await apiClient.get<Flight>(`/flights/${flightId}`,{headers})
                    setFlight(response.data);
                
            }
            catch(error){
                console.log("Failed to fetch flight details");
            }

        }
        fetchFlight();
    }, [flightId]);

    return (
        <div className="bookingForm">
           
            <div className="flightInfo">
            <div className="bookTopbar">
            <AdminTopbar title={"BeeFlights"}></AdminTopbar>
            </div>

            <div className="mainDescrition">
                <div className="dates">
                    <div className="dateDesc">
                        <h2>{flight?.departureFrom}</h2>
                        <p>{flight?.flight_departure}</p>
                    </div>
                    {/* <div className="dateDesc">
                        <h2>{flight?.departureFrom}</h2>
                        <p>{flight?.flight_arrival}</p>
                    </div> */}
                </div>
                <div className="vertical-line">
                    <div className="icon top">
                        <FaDotCircle className="i" />
                    </div>
                    <div className="icon middle">
                        <RiPlaneLine className="i" />
                    </div>
                    <div className="icon bottom">
                        <FaLocationDot className="i" />
                    </div>
                </div>

                <div className="dates">
                    <div className="dateDesc">
                        <h2>{flight?.arrivalTo}</h2>
                        <p>{flight?.flight_arrival}</p>
                    </div>
                    {/* <div className="landing">
                        <p>14 hours 30 minutes</p>
                        <span>Non-transit</span>
                    </div> */}
                    {/* <div className="dateDesc">
                        <h2>{flight?.arrivalTo}</h2>
                        <p>SeoKarno-hatta International Airport(CGK)</p>
                    </div> */}
                </div>
            </div>


            </div>
            
            <form>
            <h2>Booking Form</h2>
            <div></div>
                <div className="inputDiv">
                <label className="labelInput" htmlFor="passengerFirstName">First Name</label>
                <input
                    name="passengerFirstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.passengerFirstName}
                    onChange={handleInputChange}
                />
                </div>
                <div className="inputDiv">
                    <label className="labelInput" htmlFor="passengerLastName">Last Name</label>
                <input
                    name="passengerLastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.passengerLastName}
                    onChange={handleInputChange}
                />
                </div>
                <div className="inputDiv">

               <label className="labelInput" htmlFor="passengerEmail">Email</label>
                <input
                    name="passengerEmail"
                    type="email"
                    placeholder="Email"
                    value={formData.passengerEmail}
                    onChange={handleInputChange}
                />
                 </div>
                <div className="inputDiv">

               <label className="labelInput" htmlFor="cardId">Card Id</label>
                <input
                    name="cardId"
                    type="text"
                    placeholder="Card Id"
                    value={formData.cardId}
                    onChange={handleInputChange}
                />
                 </div>
                <div className="inputDiv">

               <label className="labelInput" htmlFor="passportId">Passport Id</label>
                <input
                    name="passportId"
                    type="text"
                    placeholder="Passport Id"
                    value={formData.passportId}
                    onChange={handleInputChange}
                />
                 </div>
                <div className="inputDiv">

               <label className="labelInput" htmlFor="phoneNumber">Phone Number</label>
                <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                 </div>
                 <div className="inputDiv">
                <label  className="labelInput" htmlFor="numberOfSeats">Number Of Seats</label>
                <input
                    name="numberOfSeats"
                    type="number"
                    placeholder="Number Of Seats"
                    value={formData.numberOfSeats}
                    onChange={handleInputChange}
                />
                </div>
                <div></div>
                <div className="submitBooking" >
                <button type="button" onClick={handleSubmit}>
                    Submit Booking
                </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;
