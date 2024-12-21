import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface Airport {
  airport_id: number;
  airport_name: string;
  iata_code: string;
  city: string;
  country: string;
}

function AdminAirport() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [newAirport, setNewAirport] = useState({
    id:0,
    airportName: "",
    iaatCode: "",
    city: "",
    country: "",
  });

  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAirports = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/airport/all-airports?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        { headers }
      );
      setAirports(response.data.list);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, [pageNumber]);

  const deleteAirport = async (id: number) => {
    try {
      await apiClient.delete(`/airport/delete/${id}`,{ headers });
      setAirports((prevAirports) =>
        prevAirports.filter((airport) => airport.airport_id !== id)
      );
    } catch (error) {
      console.error("Error deleting airport:", error);
    }
  };

  const addAirport = async () => {
    
    try {
      const response = await apiClient.post("/airport/add-airport", newAirport,{ headers });
      setAirports((prevAirports) => [...prevAirports, response.data]);
      setShowModal(false);
      setNewAirport({id:0, airportName: "", iaatCode: "", city: "", country: "" });
    } catch (error) {
      console.error("Error adding airport:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAirport((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="airport-table">
      <h1>Airports</h1>
      <div className="addBtn">
      <button className="btn-add" onClick={() => setShowModal(true)}>
        Add Airport
      </button>

      </div>
      {showModal && (
        <div className="modal">
           <h3>Add Airport</h3>
          <div className="modal-content">
           
            <form className="airplanes-form"  onSubmit={(e) => e.preventDefault()}>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="airportName">Airport Name</label>
              <input
                type="text"
                name="airportName"
                placeholder="Airport Name"
                value={newAirport.airportName}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="iaatCode">Iaat Code</label>
              <input
                type="text"
                name="iaatCode"
                placeholder="IATA Code"
                value={newAirport.iaatCode}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAirport.city}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="adminInputs">
              <label className="labelInput" htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAirport.country}
                onChange={handleInputChange}
                required
              />
              </div>
              <div className="buttons-form">

              <button className="btn-submit" onClick={addAirport}>
                Add
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              </div>
             
            </form>
          </div>
        </div>
      )}
     
      {loading ? (
        <p>Loading airports...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IATA Code</th>
                <th>City</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {airports.map((airport) => (
                <tr key={airport.airport_id}>
                  <td>{airport.airport_id}</td>
                  <td>{airport.airport_name}</td>
                  <td>{airport.iata_code}</td>
                  <td>{airport.city}</td>
                  <td>{airport.country}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteAirport(airport.airport_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <div className="pag-items">
            <button className="prev"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
              disabled={pageNumber === 0}
            >
              Previous
            </button>
            <span>
              Page {pageNumber + 1} of {totalPages}
            </span>
            <button className="next"
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={pageNumber === totalPages - 1}
            >
              Next
            </button>
            </div>
          </div>
        </>
      )}

     
    </div>
  );
}

export default AdminAirport;
