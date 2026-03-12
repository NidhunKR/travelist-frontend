import { useEffect, useState } from "react";
import API from "../../Services/api";
import { useNavigate } from "react-router-dom";
import Flights from "../Flight/Flights";

function CustomerHome() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destinationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.price.toString().includes(searchTerm)
  );

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>

      {/* HERO SECTION */}
      <div style={heroSection}>

        <div style={heroOverlay}>

          <h1 style={heroTitle}>Explore the World 🌍</h1>

          <p style={heroSubtitle}>
            Find Flights and Travel Packages Easily
          </p>

          {/* FLIGHT SEARCH */}
          <div style={{ marginTop: "30px" }}>
            <Flights />
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

            <div
              key={pkg.id}
              style={packageCard}
            >

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
  backgroundImage:
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "120px 20px",
};

const heroOverlay = {
  maxWidth: "1100px",
  margin: "auto",
  textAlign: "center",
  color: "white",
};

const heroTitle = {
  fontSize: "48px",
  fontWeight: "bold",
};

const heroSubtitle = {
  fontSize: "20px",
  marginTop: "10px",
};

const packageSearch = {
  width: "50%",
  padding: "12px 20px",
  borderRadius: "25px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "40px",
  color: "#2c5364"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
  gap: "30px"
};

const packageCard = {
  backgroundColor: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s"
};

const packageImage = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const viewButton = {
  padding: "10px 18px",
  backgroundColor: "#2c5364",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%"
};