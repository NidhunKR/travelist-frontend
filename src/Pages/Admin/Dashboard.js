import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../../Services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [destinationCount, setDestinationCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    // Get profile
    api.get("/api/Auth/profile")
      .then(res => {
        setEmail(res.data.userEmail);
      })
      .catch(err => {
        console.log("Token invalid", err);
        handleLogout();
      });

    // Get Destinations
    api.get("/api/Destination")
      .then(res => setDestinationCount(res.data.length))
      .catch(err => console.log(err));

    // Get Packages
    api.get("/api/Package")
      .then(res => setPackageCount(res.data.length))
      .catch(err => console.log(err));

    // Get Bookings
    api.get("/api/Booking/all")
      .then(res => setBookingCount(res.data.length))
      .catch(err => console.log(err));

  }, [handleLogout]);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "10px" }}>Admin Dashboard</h2>
      <p style={{ marginBottom: "30px" }}>Welcome, {email} 👋</p>

      {/* Stats Cards */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "40px"
      }}>

        <div style={cardStyle}>
          <h3>{destinationCount}</h3>
          <p>Destinations</p>
        </div>

        <div style={cardStyle}>
          <h3>{packageCount}</h3>
          <p>Packages</p>
        </div>

        <div style={cardStyle}>
          <h3>{bookingCount}</h3>
          <p>Bookings</p>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => navigate("/admin/destinations")} style={btnStyle}>
          Manage Destinations
        </button>

        <button onClick={() => navigate("/trips")} style={btnStyle}>
          Manage Packages
        </button>

        <button onClick={() => navigate("/admin-bookings")} style={btnStyle}>
          Manage Bookings
        </button>

        <button onClick={handleLogout} style={logoutStyle}>
          Logout
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  padding: "25px",
  borderRadius: "10px",
  backgroundColor: "#2c5364",
  color: "white",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const btnStyle = {
  padding: "12px 20px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#2c5364",
  color: "white",
  cursor: "pointer"
};

const logoutStyle = {
  padding: "12px 20px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "red",
  color: "white",
  cursor: "pointer"
};

export default Dashboard;