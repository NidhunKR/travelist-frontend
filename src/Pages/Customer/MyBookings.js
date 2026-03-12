import { useEffect, useState } from "react";
import API from "../../Services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/api/booking/my-bookings");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  return (
    <div style={pageContainer}>

      <h2 style={title}>
        My Bookings 🧳
      </h2>

      {bookings.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          You have no bookings yet.
        </p>
      )}

      <div style={gridContainer}>

        {bookings.map((b) => (
          <div
            key={b.id}
            style={card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h3 style={cardTitle}>{b.package.title}</h3>

            <p>
              📍 <strong>Destination:</strong> {b.package.destination}
            </p>

            <p>
              💰 <strong>Price:</strong> ₹{b.package.price}
            </p>

            <p>
              📅 <strong>Travel Date:</strong>{" "}
              {new Date(b.travelDate).toDateString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  ...statusBadge,
                  background:
                    b.status === "Confirmed"
                      ? "#28a745"
                      : b.status === "Cancelled"
                      ? "#dc3545"
                      : "#FFC107",
                }}
              >
                {b.status}
              </span>
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyBookings;


/* STYLES */

const pageContainer = {
  padding: "60px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "32px",
  color: "#222",
  fontWeight: "700"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
  gap: "25px"
};

const card = {
  background: "white",
  borderRadius: "16px",
  padding: "25px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease"
};

const cardTitle = {
  marginBottom: "12px",
  color: "#111"
};

const statusBadge = {
  padding: "4px 12px",
  borderRadius: "20px",
  color: "white",
  fontSize: "12px",
  fontWeight: "600",
  marginLeft: "5px"
};