import { useEffect, useState } from "react";
import api from "../../Services/api";

function MyFlightBookings() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/flightbooking/my-bookings");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchBookings();

  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/api/flightbooking/${id}/cancel`);
      alert("Booking cancelled ❌");

      fetchBookings();

    } catch (err) {
      console.log("Cancel error:", err);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f4f6f9", minHeight: "100vh" }}>

      <h2 style={{ marginBottom: "30px" }}>✈ My Flight Bookings</h2>

      {bookings.length === 0 ? (

        <p>No flight bookings yet ✈️</p>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >

          {bookings.map((b) => (

            <div
              key={b.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
              }}
            >

              <h3>{b.flight?.airline}</h3>

              <p>
                <strong>{b.flight?.departureCity}</strong> →{" "}
                <strong>{b.flight?.arrivalCity}</strong>
              </p>

              <p>
                Departure: {new Date(b.flight?.departureTime).toLocaleString()}
              </p>

              <p>
                Arrival: {new Date(b.flight?.arrivalTime).toLocaleString()}
              </p>

              <p><strong>Passenger:</strong> {b.passengerName}</p>

              <p><strong>Seats:</strong> {b.seats}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: b.status === "Cancelled" ? "red" : "green",
                    fontWeight: "bold"
                  }}
                >
                  {b.status}
                </span>
              </p>

              {b.status !== "Cancelled" && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Cancel Booking
                </button>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyFlightBookings;