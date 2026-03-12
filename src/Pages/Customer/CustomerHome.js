import { useEffect, useState } from "react";
import API from "../../Services/api";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [destinations, setDestinations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await API.get("/api/Package");
      setPackages(res.data);
    } catch (err) {
      console.log("Error loading packages:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res = await API.get("/api/Destination");
      setDestinations(res.data);
    } catch (err) {
      console.log("Error loading destinations:", err);
    }
  };

  fetchPackages();
  fetchDestinations();
}, []);

  const handleFlightSearch = () => {
    if (!fromCity || !toCity) {
      alert("Please enter departure and destination");
      return;
    }

    navigate(`/flights?from=${fromCity}&to=${toCity}`);
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destinationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.price.toString().includes(searchTerm)
  );

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* HERO SECTION */}
      <div style={heroSection}>

        <div style={heroOverlay}>

          <h1 style={heroTitle}>Where Your Next Adventure Starts 🌎</h1>

          <p style={heroSubtitle}>
            Search flights and discover the world effortlessly.
          </p>

          {/* MODERN FLIGHT SEARCH */}
          <div style={flightSearchBox}>

            <div style={flightInputBox}>
              <label style={label}>From</label>
              <select
  value={fromCity}
  onChange={(e) => setFromCity(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Departure</option>

  {destinations.map((d) => (
    <option key={d.id} value={d.name}>
      {d.name}
    </option>
  ))}

</select>
            </div>

            <div style={flightInputBox}>
              <label style={label}>To</label>
              <select
  value={toCity}
  onChange={(e) => setToCity(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Destination</option>

  {destinations.map((d) => (
    <option key={d.id} value={d.name}>
      {d.name}
    </option>
  ))}

</select>
            </div>

            <button
              onClick={handleFlightSearch}
              style={flightSearchButton}
            >
              🔎 Search Flights
            </button>

          </div>

        </div>

      </div>

      {/* PACKAGES SECTION */}
      <div style={{ padding: "60px 80px" }}>

        {/* SEARCH BAR */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <input
            type="text"
            placeholder="Search destinations or packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={packageSearch}
          />
        </div>

        <h2 style={sectionTitle}>
          Popular Travel Packages ✨
        </h2>

        {/* PACKAGE GRID */}
        <div style={gridContainer}>

          {filteredPackages.map((pkg) => (

            <div key={pkg.id} style={packageCard}>

              <img
                src={
                  pkg.imageUrl
                    ? `https://travelist-backend-i8zf.onrender.com/${pkg.imageUrl}`
                    : "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={pkg.title}
                style={packageImage}
              />

              <div style={{ padding: "20px" }}>

                <h3 style={{ marginBottom: "10px", color: "#203a43" }}>
                  {pkg.title}
                </h3>

                <p style={{ color: "#555" }}>
                  <strong>Destination:</strong> {pkg.destinationName}
                </p>

                <p style={{ color: "#555", marginBottom: "15px" }}>
                  <strong>Price:</strong> ₹{pkg.price}
                </p>

                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  style={viewButton}
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default CustomerHome;


/* STYLES */

const heroSection = {
  background: "#FFF8E1",
  padding: "100px 20px 80px 20px",
  textAlign: "center"
};

const heroTitle = {
  fontSize: "46px",
  fontWeight: "700",
  color: "#222"
};

const heroSubtitle = {
  fontSize: "18px",
  marginTop: "10px",
  color: "#555"
};

const heroOverlay = {
  maxWidth: "1100px",
  margin: "auto",
  textAlign: "center",
  color: "white",
};



const flightSearchBox = {
  marginTop: "40px",
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  display: "grid",
  gridTemplateColumns: "2fr 2fr 1fr",
  gap: "20px",
  alignItems: "end",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  maxWidth: "900px",
  marginInline: "auto"
};

const flightInputBox = {
  display: "flex",
  flexDirection: "column",
  width: "100%"
};

const label = {
  fontSize: "13px",
  color: "#777",
  marginBottom: "4px"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};

const flightSearchButton = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  height: "46px"
};

const packageSearch = {
  width: "50%",
  padding: "12px 22px",
  borderRadius: "30px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "40px",
  color: "#222",
  fontWeight: "700"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
  gap: "30px"
};

const packageCard = {
  backgroundColor: "white",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.25s ease"
  
};

const packageImage = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const viewButton = {
  padding: "10px 18px",
  backgroundColor: "#111",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  width: "100%"
};