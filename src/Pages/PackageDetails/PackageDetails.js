import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../Services/api";

function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await API.get(`/api/Package/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.log("Error loading package:", err);
      }
    };

    fetchPackage();
  }, [id]);

  const handleBooking = async () => {
    if (!travelDate) {
      alert("Please select a travel date");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const formattedDate = new Date(travelDate).toISOString();

      await API.post(
        `/Booking?packageId=${pkg.id}&travelDate=${formattedDate}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Successful 🎉");
      navigate("/my-bookings"); // optional page
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!pkg)
    return (
      <h3 style={{ padding: "40px", textAlign: "center" }}>
        Loading package...
      </h3>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "600px",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "20px",
            color: "#555",
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ marginBottom: "20px" }}>{pkg.title}</h1>
        <img
  src={
    pkg.imageUrl
      ? pkg.imageUrl.startsWith("http")
        ? pkg.imageUrl
        : `https://localhost:7036${pkg.imageUrl}`
      : "https://via.placeholder.com/600x300"
  }
  alt={pkg.title}
  style={{
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px"
  }}
/>

        <p><strong>Destination:</strong> {pkg.destinationName}</p>
        <p><strong>Price:</strong> ₹{pkg.price}</p>
        <p style={{ marginBottom: "20px" }}>
          <strong>Details:</strong> {pkg.details}
        </p>

        {/* Date Picker */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Select Travel Date
          </label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: loading ? "#999" : "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default PackageDetails;