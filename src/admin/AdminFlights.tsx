import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

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
function AdminFlights(){
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newFlight, setNewFlight] = useState({
        id:0,
      flightNumber: '',
      departureTime: '',
      arrivalTime: '',
      basePrice: 0,
      departureFromId: 0,
      arrivalToId: 0,
      numberOfSeats: 0,
      airplaneId: 0,
    });
  
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/flights/all-flights', { headers });
        setFlights(response.data.list);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFlights();
    }, []);
  
    const deleteFlight = async (id: number) => {
      try {
        await apiClient.delete(`/flights/delete/${id}`, { headers });
        setFlights((prevFlights) => prevFlights.filter((flight) => flight.flight_id !== id));
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    };
  
    const addFlight = async () => {
      try {
        const response = await apiClient.post('/flights/add-Flight', newFlight, { headers });
        setFlights((prevFlights) => [...prevFlights, response.data]);
        setShowModal(false);
        setNewFlight({
            id:0,
          flightNumber: '',
          departureTime: '',
          arrivalTime: '',
          basePrice: 0,
          departureFromId: 0,
          arrivalToId: 0,
          numberOfSeats: 0,
          airplaneId: 0
        });
      } catch (error) {
        console.error('Error adding flight:', error);
      }
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewFlight((prev) => ({ ...prev, [name]: value }));
    };
  

    return(
       <div className="airport-table">
      <h1>Flights</h1>
      <div className="addBtn">
      <button className="btn-add" onClick={() => setShowModal(true)}>Add Flight</button></div>
      {showModal && (
        <div className="modal">
            <h3>Add Flight</h3>
          <div className="modal-content">
            
            <form className="airplanes-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="flightNumber"
                placeholder="Flight Number"
                value={newFlight.flightNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="departureTime"
                placeholder="departureTime"
                value={newFlight.departureTime}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="arrivalTime"
                placeholder="arrivalTime"
                value={newFlight.arrivalTime}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="basePrice"
                placeholder="Flight basePrice"
                value={newFlight.basePrice}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="departureFromId"
                placeholder="Base departureFromId"
                value={newFlight.departureFromId}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="arrivalToId"
                placeholder="arrivalToId "
                value={newFlight.arrivalToId}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="numberOfSeats"
                placeholder="numberOfSeats"
                value={newFlight.numberOfSeats}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="airplaneId"
                placeholder="airplaneId"
                value={newFlight.airplaneId}
                onChange={handleInputChange}
                required
              />
              <div></div>
              <div className="buttons-form"><button className="btn-submit" onClick={addFlight}>
                Add
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button></div>
              
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Flight Number</th>
              <th>Status</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Base Price</th>
              <th>Departure From</th>
              <th>Arrival To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flight_id}>
                <td>{flight.flight_id}</td>
                <td>{flight.flightNumber}</td>
                <td>{flight.status}</td>
                <td>{flight.flight_departure}</td>
                <td>{flight.flight_arrival}</td>
                <td>{flight.basePrice}</td>
                <td>{flight.departureFrom}</td>
                <td>{flight.arrivalTo}</td>
                <td>
                  <button className="btn-delete" onClick={() => deleteFlight(flight.flight_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
    </div>
    )
}
export default AdminFlights;