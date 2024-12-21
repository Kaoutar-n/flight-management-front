import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface Airplane {
  airplane_id: number;
  model: string;
  capacity: number;
  dateFabrication: string;
  
}

function AdminAirplanes() {
  const [flights, setFlights] = useState<Airplane[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFlight, setNewFlight] = useState({
   id: 0,
    model: '',
    capacity: 0,
    dateFabrication: ''
    
  });

  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/airplane/all-airplane', { headers });
      setFlights(response.data.list);
    } catch (error) {
      console.error('Error fetching Airplanes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const deleteFlight = async (id: number) => {
    try {
      await apiClient.delete(`/airplane/delete/${id}`, { headers });
      setFlights((prevFlights) => prevFlights.filter((flight) => flight.airplane_id !== id));
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const addFlight = async () => {
    try {
      const response = await apiClient.post('/airplane/add-airplane', newFlight, { headers });
      setFlights((prevFlights) => [...prevFlights, response.data]);
      setShowModal(false);
      setNewFlight({
        id: 0,
        model: '',
        capacity: 0,
        dateFabrication: ''
        
      });
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="airport-table">
      <h1>Airplanes</h1>
      <div className="addBtn">
      <button className="btn-add" onClick={() => setShowModal(true)}>Add Airplane</button></div>
      {showModal && (
        <div className="modal">
            <h3>Add Airplane</h3>
          <div className="modal-content">
            
            <form className="airplanes-form" onSubmit={(e) => e.preventDefault()}>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="model">Model</label>
              <input
                type="text"
                name="model"
                placeholder="model"
                value={newFlight.model}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="capacity">Capacity</label>
              <input
                type="number"
                name="capacity"
                placeholder="capacity"
                value={newFlight.capacity}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="dateFabrication">Fabrication Date</label>
              <input
                type="date"
                name="dateFabrication"
                placeholder="Fabrication date"
                value={newFlight.dateFabrication}
                onChange={handleInputChange}
                required
              /></div>
             
              
            
             
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
        <p>Loading Airplanes...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Airplane ID</th>
              <th>Model</th>
              <th>Capacity</th>
              <th>Fabrication Date</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.airplane_id}>
                <td>{flight.airplane_id}</td>
                <td>{flight.model}</td>
                <td>{flight.capacity}</td>
                <td>{flight.dateFabrication}</td>
              
                <td>
                  <button className="btn-delete" onClick={() => deleteFlight(flight.airplane_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
    </div>
  );
}

export default AdminAirplanes;
