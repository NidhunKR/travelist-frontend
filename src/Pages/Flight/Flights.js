
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Flights() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  const params = new URLSearchParams(location.search);

  const fromParam = params.get("from");
  const toParam = params.get("to");

  if (fromParam && toParam) {
    setFrom(fromParam);
    setTo(toParam);

    navigate(`/flight-results?from=${fromParam}&to=${toParam}`);
  }

}, [location.search,navigate]);
  

  const searchFlights = () => {

    if (!from || !to) {
      alert("Please enter From and To city");
      return;
    }

    navigate(`/flight-results?from=${from}&to=${to}&maxPrice=${maxPrice}`);
  };

  return (
    <div style={searchContainer}>

      <h2 style={title}>Search Flights ✈️</h2>

      <div style={searchRow}>

        <div style={inputBox}>
          <label style={label}>From</label>
          <input
            type="text"
            placeholder="Departure City"
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputBox}>
          <label style={label}>To</label>
          <input
            type="text"
            placeholder="Destination City"
            value={to}
            onChange={(e)=>setTo(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputBox}>
          <label style={label}>Max Price</label>
          <input
            type="number"
            placeholder="Optional"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={searchFlights} style={searchButton}>
          🔎 Search
        </button>

      </div>

    </div>
  );
}

/* STYLES */

const searchContainer = {
  background: "white",
  padding: "35px",
  borderRadius: "16px",
  maxWidth: "950px",
  margin: "auto",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
};

const title = {
  marginBottom: "25px",
  fontSize: "26px",
  fontWeight: "700",
  color: "#222"
};

const searchRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr auto",
  gap: "18px",
  alignItems: "end"
};

const inputBox = {
  display: "flex",
  flexDirection: "column"
};

const label = {
  fontSize: "13px",
  color: "#777",
  marginBottom: "4px"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const searchButton = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "12px 26px",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "600",
  height: "44px"
};

export default Flights;