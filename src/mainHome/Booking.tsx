import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiExchangeFill } from "react-icons/ri";
import LINE from "../assets/LINE.png";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { LuBaggageClaim } from "react-icons/lu";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaDotCircle } from "react-icons/fa";
import { RiPlaneLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router";

interface Flight {
  flight_id: 0;
  
  flightNumber: string;
  flight_arrival: string; //dates
  flight_departure: string;
  basePrice: number;
  departureFrom: string; //place
  arrivalTo: string;
 
  flightClass: string;
  flightEscale: string;
  program: string;
  bagageCapacity: number;
  CabinCapacity:number;
  
 
}

function Booking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  const [visibleFlights, setVisibleFlights] = useState<Record<number, boolean>>(
    {}
  );
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState({
    id: 0,
    departureFrom: "",
    arrivalTo: "",
    departureDate: "",
  });
  useEffect(() => {
    apiClient
      .get("/flights/all-flights", { headers })
      .then((response) => {
        setFlights(response.data.list);
        setFilteredFlights(response.data.list);
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [id]: value }));
  };
  const handleSearch = () => {
    const filtered = flights.filter(
      (flight) =>
        flight.departureFrom
          .toLowerCase()
          .includes(searchParams.departureFrom.toLowerCase()) &&
        flight.arrivalTo
          .toLowerCase()
          .includes(searchParams.arrivalTo.toLowerCase()) &&
        flight.flight_departure.includes(searchParams.departureDate)
    );
    setFilteredFlights(filtered);
  };

  const toggleVisibility = (flightId: number) => {
    setVisibleFlights((prev) => ({
      ...prev,
      [flightId]: !prev[flightId],
    }));
  };
  const handleSelectFlight = (flightId: number) => {
    navigate("/book-flight", { state: { flightId } });
  };
  const calculateDuration = (arrival: string, departure: string): string => {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const differenceMs = arrivalDate.getTime() - departureDate.getTime();

    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours and ${minutes} minutes`;
  };
  const getHourAndMinute = (arrival: string): string => {
    const date = new Date(arrival);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${amPm}`;
  };
  const extractDate = (dateTime: string): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bookingContainer">
      <div className="cordonneDiv">
        <div className="inputContainer">
          <label htmlFor="fromPlace" className="input-label">
            From
          </label>
          <input
            className="input"
            id="departureFrom"
            type="text"
            value={searchParams.departureFrom}
            placeholder="Departure"
            onChange={handleInputChange}
          />
        </div>
        <div className="exchangeIcon">
          <RiExchangeFill className="icon1" />
        </div>
        <div className="inputContainer">
          <label htmlFor="toPlace" className="input-label">
            To
          </label>
          <input
            className="input"
            id="arrivalTo"
            type="text"
            value={searchParams.arrivalTo}
            placeholder="Arrival"
            onChange={handleInputChange}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="departure-date" className="input-label">
            Departure Date
          </label>
          <input
            className="input"
            id="departureDate"
            type="date"
            value={searchParams.departureDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="searchIcon" onClick={handleSearch}>
          <FaSearch className="icon" />
        </div>
      </div>

      <div className="detailsContainer">
        <div className="partOne">
          <div className="filters">
            <h2>Filters</h2>
            <p>Reset</p>
          </div>
          <div className="line"></div>
          <div className="transit">
            <h2>Transit Amount</h2>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="class" value="economy" />
                <span className="circle"></span> All
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="business" />
                <span className="circle"></span> Non-Transit
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="first" />
                <span className="circle"></span> 1 stop
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="first" />
                <span className="circle"></span> 2+ stops
              </label>
            </div>
          </div>
          <div className="line"></div>
          <div className="price">
            <h2>Price Range</h2>
            <input
              className="range-input"
              id="price-range"
              type="range"
              min="0"
              max="100"
              step="1"
              defaultValue="50"
            />
          </div>
          <div className="line"></div>
          <div className="flightClass">
            <h2>Flight Class</h2>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="class" value="economy" />
                <span className="circle"></span> All
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="business" />
                <span className="circle"></span> Economy
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="first" />
                <span className="circle"></span> Business
              </label>
              <label className="radio-option">
                <input type="radio" name="class" value="first" />
                <span className="circle"></span> First Class
              </label>
            </div>
          </div>
          <div className="apply">
            <button>Apply Filters</button>
          </div>
        </div>
        <div className="partTwoWrap">
          {filteredFlights.map((flight) => (
            <div className="partTwo" key={flight.flight_id}>
              <div className="flightHeader">
                <div className="airline">
                  <img src={LINE} alt="" className="airlineLogo" />
                  <div className="airlineDescription">
                    <h2>Bee Flights</h2>
                    <div className="flightDetails">
                      <p>{flight.flightNumber}</p>
                      <div className="line"></div>
                      <p>
                        {calculateDuration(
                          flight.flight_arrival,
                          flight.flight_departure
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="breifFiltered">
                  <div className="filtered">
                    <p>{flight.flightClass}</p>
                  </div>
                  <div className="filtered">
                    <p>{flight.flightEscale}</p>
                  </div>
                  {visibleFlights[flight.flight_id] ? (
                    <IoIosArrowDropupCircle
                      className="descIcon"
                      onClick={() => toggleVisibility(flight.flight_id)}
                    />
                  ) : (
                    <IoIosArrowDropdownCircle
                      className="descIcon"
                      onClick={() => toggleVisibility(flight.flight_id)}
                    />
                  )}
                </div>
              </div>
              {visibleFlights[flight.flight_id] && (
                <div className="flightDetailsContent">
                  <div className="includes">
                    <div className="includesText">
                      <p>Include free Baggage & Cabin in capacity</p>
                    </div>
                    <div className="includesIcons">
                      <div className="weigts">
                        <LuBaggageClaim className="weigtsIcon" />
                        <p>{flight.bagageCapacity} kg</p>
                      </div>
                      <div className="weigts">
                        <PiBagSimpleFill className="weigtsIcon" />
                        <p>{flight.CabinCapacity} kg</p>
                      </div>
                    </div>
                  </div>
                  <div className="mainDescrition">
                    <div className="dates">
                      <div className="dateDesc">
                        <h2>{getHourAndMinute(flight.flight_departure)}</h2>
                        <p>{extractDate(flight.flight_departure)}</p>
                      </div>
                      <div className="dateDesc">
                        <h2>{getHourAndMinute(flight.flight_arrival)}</h2>
                        <p>{extractDate(flight.flight_arrival)}</p>
                      </div>
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
                        <h2>{flight.departureFrom}</h2>
                        <p>SeoKarno-hatta International Airport(CGK)</p>
                      </div>
                      <div className="landing">
                        <p>
                          {calculateDuration(
                            flight.flight_arrival,
                            flight.flight_departure
                          )}
                        </p>
                        <span>{flight.flightEscale}</span>
                      </div>
                      <div className="dateDesc">
                        <h2>{flight.arrivalTo}</h2>
                        <p>Seo...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="dashed-line"></div>
              <div className="selectFlight">
                <div className="pricing">
                  <p>MAD</p>
                  <h2>{flight.basePrice}</h2>
                  <p>/ person</p>
                </div>
                <div className="selectButton">
                  <button
                    className="selectBtn"
                    onClick={() => handleSelectFlight(flight.flight_id)}
                  >
                    Select Flight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Booking;
