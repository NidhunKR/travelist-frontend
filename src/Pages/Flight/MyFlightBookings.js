import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function MyFlightBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/FlightBooking/my-bookings"); // ✅ fixed casing
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // ✅ fixed navigation
      return;
    }

    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/api/FlightBooking/${id}/cancel`); // ✅ fixed casing
      alert("Booking cancelled ❌");
      fetchBookings();
    } catch (err) {
      console.log("Cancel error:", err);
    }
  };

  if (loading) {
    return <h3 style={{ padding: "40px" }}>Loading bookings...</h3>;
  }

  return (
    <div style={{ padding: "40px", background: "#f4f6f9", minHeight: "100vh" }}>

      <h2 style={{ marginBottom: "30px" }}>✈ My Flight Bookings</h2>

      {bookings.length === 0 ? (
        <p>No flight bookings yet ✈️</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px"
          }}
        >
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
              }}
            >

              <h3>{b.flight?.airline}</h3>

              <p>
                <strong>{b.flight?.departureCity}</strong> →{" "}
                <strong>{b.flight?.arrivalCity}</strong>
              </p>

              <p>
                Departure:{" "}
                {new Date(b.flight?.departureTime).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </p>

              <p>
                Arrival:{" "}
                {new Date(b.flight?.arrivalTime).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </p>

              <p><strong>Passenger:</strong> {b.passengerName}</p>

              <p><strong>Seats:</strong> {b.seats}</p>

              {/* ✅ Added Price */}
              <p>
                <strong>Price:</strong> ₹
                {(b.flight?.price * 83).toLocaleString()}
              </p>

              {/* ✅ Better status UI */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      b.status === "Cancelled"
                        ? "red"
                        : b.status === "Pending"
                        ? "orange"
                        : "green",
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
                    padding: "10px",
                    width: "100%",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
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