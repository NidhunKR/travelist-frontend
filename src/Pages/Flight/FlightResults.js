import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../Services/api";

function FlightResults() {

  const location = useLocation();
  const [flights, setFlights] = useState([]);

  useEffect(() => {

    const params = new URLSearchParams(location.search);

    const from = params.get("from");
    const to = params.get("to");
    const maxPrice = params.get("maxPrice");

    if (!from || !to) return;

    const fetchFlights = async () => {

      try {

        const res = await API.get("/api/Flight/search", {
          params: {
            from: from,
            to: to,
            maxPrice: maxPrice || null
          }
        });

        setFlights(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchFlights();

  }, [location.search]);

  return (
    <div style={{ padding: "40px" }}>

      <h2>Flight Results</h2>

      {flights.length === 0 ? (
        <p>No flights found</p>
      ) : (
        flights.map((flight) => (
          <div key={flight.id} style={{
            background:"white",
            padding:"20px",
            marginBottom:"15px",
            borderRadius:"10px",
            boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
          }}>

            <h3>{flight.airline}</h3>

            <p>
              {flight.departureCity} → {flight.arrivalCity}
            </p>

            <p>₹{flight.price}</p>

            <p>
              Departure: {new Date(flight.departureTime).toLocaleString()}
            </p>

            <p>
              Arrival: {new Date(flight.arrivalTime).toLocaleString()}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default FlightResults;