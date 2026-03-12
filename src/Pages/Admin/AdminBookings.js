import { useEffect, useState } from "react";
import API from "../../Services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/api/booking/all");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/booking/${id}/status?status=${status}`);
      fetchBookings();
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  return (
    <div style={pageContainer}>
      <h2 style={title}>📋 All Bookings</h2>

      {bookings.length === 0 && (
        <p style={{ textAlign: "center" }}>No bookings found</p>
      )}

      {bookings.map((b) => (
        <div key={b.id} style={card}>
          <h3 style={{ marginBottom: "10px" }}>{b.package}</h3>

          <p><strong>User:</strong> {b.user}</p>
          <p><strong>Destination:</strong> {b.destination}</p>
          <p>
            <strong>Travel Date:</strong>{" "}
            {new Date(b.travelDate).toDateString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                fontWeight: "bold",
                color:
                  b.status === "Confirmed"
                    ? "green"
                    : b.status === "Cancelled"
                    ? "red"
                    : "orange"
              }}
            >
              {b.status}
            </span>
          </p>

          <div style={buttonGroup}>
            <button
              onClick={() => updateStatus(b.id, "Confirmed")}
              style={confirmBtn}
            >
              Confirm
            </button>

            <button
              onClick={() => updateStatus(b.id, "Cancelled")}
              style={cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;


/* STYLES */

const pageContainer = {
  padding: "60px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "30px",
  fontWeight: "700"
};

const card = {
  background: "white",
  padding: "25px",
  marginBottom: "20px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto"
};

const buttonGroup = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};

const confirmBtn = {
  padding: "8px 16px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer"
};

const cancelBtn = {
  padding: "8px 16px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer"
};