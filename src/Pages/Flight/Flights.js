import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Flights() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const searchFlights = () => {

    if (!from || !to) {
      alert("Please enter From and To city");
      return;
    }

    navigate(`/flights?from=${from}&to=${to}&maxPrice=${maxPrice}`);
  };

  return (
    <div style={searchContainer}>

      <h2>✈ Search Flights</h2>

      <div style={searchRow}>

        <input
          type="text"
          placeholder="From City"
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="To City"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          style={inputStyle}
        />

        <button onClick={searchFlights} style={searchButton}>
          Search Flights
        </button>

      </div>

    </div>
  );
}

/* STYLES */

const searchContainer = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "900px",
  margin: "auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const searchRow = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  minWidth: "160px"
};

const searchButton = {
  background: "#2c5364",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Flights;