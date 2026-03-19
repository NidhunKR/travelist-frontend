import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../Services/api";

function FlightResults() {

  const [flights, setFlights] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(location.search);

    const from = params.get("from");
    const to = params.get("to");

    setFromCity(from || "");
    setToCity(to || "");

    if (from && to) {
      fetchFlights(from, to);
    }

  }, [location.search]);

  const fetchFlights = async (from, to) => {

    try {

      setLoading(true);

      const res = await axios.get(
        `https://travelist-backend-i8zf.onrender.com/api/Flight/search?from=${from}&to=${to}`
      );

      setFlights(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Search
  const handleSearch = () => {

    if (!fromCity || !toCity) {
      alert("Please enter departure and destination");
      return;
    }

    navigate(`/flights?from=${fromCity}&to=${toCity}`);
  };

  // ✈ Duration calculation
  const getDuration = (departure, arrival) => {

    const dep = new Date(departure);
    const arr = new Date(arrival);

    let depMinutes = dep.getUTCHours() * 60 + dep.getUTCMinutes();
    let arrMinutes = arr.getUTCHours() * 60 + arr.getUTCMinutes();

    let diff = arrMinutes - depMinutes;

    if (diff < 0) diff += 24 * 60;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading flights...</h2>
      </div>
    );
  }
  const handleBookFlight = async (flight) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  try {
    await API.post(
      "/api/FlightBooking",
      {
        flightId: flight.id,
        passengerName: "Test User",
        seats: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // ✅ VERY IMPORTANT
        }
      }
    );

    alert("Flight booked successfully ✈️");
    navigate("/my-flight-bookings");

  } catch (err) {
    console.error("Booking error:", err);
    alert("Booking failed ❌");
  }
};

  return (
    <div style={{ padding: "30px 20px", background: "#FFF8E1", minHeight: "100vh" }}>

      <h2 style={{
  marginBottom: "25px",
  fontSize: "clamp(24px,5vw,32px)",
  color: "#222",
  fontWeight: "700"
}}>
Available Flights ✈️
</h2>

      {/* 🔎 Flight Search Box */}
<div
  style={{
    background: "white",
padding: "28px",
borderRadius: "16px",
marginBottom: "35px",
boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
display: "grid",
gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
gap: "15px"
  }}
>

{/* FROM */}
<div style={{flex:"1",minWidth:"180px"}}>
  <label style={{fontSize:"13px",color:"gray"}}>From</label>

  <input
    value={fromCity}
    onChange={(e) => setFromCity(e.target.value)}
    placeholder="Departure City"
    style={{
      width:"100%",
      padding:"12px",
      borderRadius:"8px",
      border:"1px solid #ddd",
      marginTop:"4px"
    }}
  />
</div>

{/* TO */}
<div style={{flex:"1",minWidth:"180px"}}>
  <label style={{fontSize:"13px",color:"gray"}}>To</label>

  <input
    value={toCity}
    onChange={(e) => setToCity(e.target.value)}
    placeholder="Destination City"
    style={{
      width:"100%",
      padding:"12px",
      borderRadius:"8px",
      border:"1px solid #ddd",
      marginTop:"4px"
    }}
  />
</div>

{/* SEARCH BUTTON */}
<div>

<button
  onClick={handleSearch}
  
style={{
  background:"#111",
  color:"white",
  border:"none",
  padding:"12px 26px",
  borderRadius:"30px",
  fontSize:"15px",
  cursor:"pointer",
  fontWeight:"600"
}}
>
  🔎 Search Flights
</button>

</div>

</div>

      {flights.length === 0 && <p>No flights found</p>}

      {flights.map((f) => (

<div
  key={f.id}
  style={{
  background: "white",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "20px",
  display: "flex",
flexWrap: "wrap",
gap: "20px",
alignItems: "center",
justifyContent: "space-between",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease"
}}
>

{/* Airline */}
<div style={{display:"flex",alignItems:"center",gap:"12px",minWidth:"150px"}}>
  
  <div style={{
    width:"42px",
    height:"42px",
    borderRadius:"50%",
    background:"#FFC107",
color:"#222",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontWeight:"bold"
  }}>
    {f.airline.charAt(0)}
  </div>

  <div>
    <h4 style={{margin:"0"}}>{f.airline}</h4>
    <small style={{color:"gray"}}>Direct</small>
  </div>

</div>


{/* Departure */}
<div style={{textAlign:"center"}}>
  <h3 style={{margin:"0"}}>
    {new Date(f.departureTime).toLocaleTimeString("en-IN",{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      timeZone:"UTC"
    })}
  </h3>

  <p style={{margin:"4px 0"}}>{f.departureCity}</p>

  <small style={{color:"gray"}}>
    {new Date(f.departureTime).toLocaleDateString("en-IN",{
      day:"numeric",
      month:"short",
      year:"numeric",
      timeZone:"UTC"
    })}
  </small>
</div>


{/* Duration */}
<div style={{textAlign:"center",minwidth:"120px"}}>

  <p style={{margin:"0",fontWeight:"500"}}>
    {getDuration(f.departureTime,f.arrivalTime)}
  </p>

  <div style={{
    height:"2px",
    background:"#ddd",
    margin:"6px 0",
    position:"relative"
  }}>
    <span style={{
      position:"absolute",
      left:"50%",
      top:"-6px",
      fontSize:"12px"
    }}>
      ✈
    </span>
  </div>

  <small style={{color:"gray"}}>Non‑stop</small>

</div>


{/* Arrival */}
<div style={{textAlign:"center"}}>
  <h3 style={{margin:"0"}}>
    {new Date(f.arrivalTime).toLocaleTimeString("en-IN",{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      timeZone:"UTC"
    })}
  </h3>

  <p style={{margin:"4px 0"}}>{f.arrivalCity}</p>

  <small style={{color:"gray"}}>
    {new Date(f.arrivalTime).toLocaleDateString("en-IN",{
      day:"numeric",
      month:"short",
      year:"numeric",
      timeZone:"UTC"
    })}
  </small>
</div>


{/* Price */}
<div style={{textAlign:"right",minWidth:"120px"}}>

  <h2 style={{fontSize:"clamp(18px,4vw,24px)"}}>
    ₹{(f.price*83).toLocaleString()}
  </h2>

  <small style={{color:"gray"}}>/ adult</small>

  <br/>

  <button
  onClick={() => handleBookFlight(f)} // ✅ THIS LINE ADDED
  style={{
    marginTop:"10px",
    background:"#111",
    color:"white",
    border:"none",
    padding:"10px 20px",
    width:"100%",
    borderRadius:"22px",
    cursor:"pointer",
    fontWeight:"600"
  }}
>
  Book Flight
</button>

</div>

</div>

))}

    </div>
  );
}

export default FlightResults;