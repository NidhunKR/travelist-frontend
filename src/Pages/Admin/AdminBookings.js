import { useEffect, useState } from "react";
import API from "../../Services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/Booking/all");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/Booking/${id}/status?status=${status}`);
      fetchBookings(); // reload bookings
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2c5364" }}>
        📋 All Bookings (Admin)
      </h2>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            background: "white",
            padding: "25px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
          }}
        >
          <h3>{b.package}</h3>

          <p><strong>User:</strong> {b.user}</p>
          <p><strong>Destination:</strong> {b.destination}</p>
          <p><strong>Travel Date:</strong> {new Date(b.travelDate).toDateString()}</p>

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

          {/* ADMIN ACTION BUTTONS */}
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => updateStatus(b.id, "Confirmed")}
              style={{
                marginRight: "10px",
                padding: "8px 15px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Confirm
            </button>

            <button
              onClick={() => updateStatus(b.id, "Cancelled")}
              style={{
                padding: "8px 15px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
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