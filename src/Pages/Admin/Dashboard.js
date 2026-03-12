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

    api.get("/api/Auth/profile")
      .then(res => setEmail(res.data.userEmail))
      .catch(err => {
        console.log("Token invalid", err);
        handleLogout();
      });

    api.get("/api/Destination")
      .then(res => setDestinationCount(res.data.length));

    api.get("/api/Package")
      .then(res => setPackageCount(res.data.length));

    api.get("/api/Booking/all")
      .then(res => setBookingCount(res.data.length));

  }, [handleLogout]);

  return (
    <div style={pageContainer}>

      <h2 style={title}>Admin Dashboard</h2>

      <p style={welcomeText}>Welcome, {email} 👋</p>

      {/* Stats */}
      <div style={statsGrid}>

        <div style={card}>
          <h1>{destinationCount}</h1>
          <p>Destinations</p>
        </div>

        <div style={card}>
          <h1>{packageCount}</h1>
          <p>Packages</p>
        </div>

        <div style={card}>
          <h1>{bookingCount}</h1>
          <p>Bookings</p>
        </div>

      </div>

      {/* Navigation Buttons */}

      <div style={buttonRow}>

        <button
          onClick={() => navigate("/admin/destinations")}
          style={btn}
        >
          Manage Destinations
        </button>

        <button
          onClick={() => navigate("/trips")}
          style={btn}
        >
          Manage Packages
        </button>

        <button
          onClick={() => navigate("/admin-bookings")}
          style={btn}
        >
          Manage Bookings
        </button>

        <button
          onClick={handleLogout}
          style={logoutBtn}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;


/* STYLES */

const pageContainer = {
  padding: "50px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const title = {
  fontSize: "34px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#111"
};

const welcomeText = {
  marginBottom: "40px",
  color: "#555"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "25px",
  marginBottom: "40px"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const buttonRow = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap"
};

const btn = {
  padding: "12px 22px",
  borderRadius: "25px",
  border: "none",
  background: "#111",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
};

const logoutBtn = {
  padding: "12px 22px",
  borderRadius: "25px",
  border: "none",
  background: "#ff4d4f",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
};