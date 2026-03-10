import { useEffect, useState } from "react";
import API from "../../Services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/Booking/my-bookings");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2c5364", fontSize: "32px" }}>
        🧳 My Bookings
      </h2>

      {bookings.length === 0 && (
        <p style={{ textAlign: "center" }}>You have no bookings yet.</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          <h3 style={{ marginBottom: "10px", color: "#203a43" }}>{b.package.title}</h3>

          <p><strong>Destination:</strong> {b.package.destination}</p>
          <p><strong>Price:</strong> ₹{b.package.price}</p>
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
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
