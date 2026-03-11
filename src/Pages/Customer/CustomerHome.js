import { useEffect, useState } from "react";
import API from "../../Services/api";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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
  // 🔍 FILTER PACKAGES BASED ON SEARCH
const filteredPackages = packages.filter((pkg) =>
  pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  pkg.destinationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  pkg.price.toString().includes(searchTerm)
);

  return (
    
    <div
      style={{
        padding: "60px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh"
      }}
    >
      <div style={{ textAlign: "center", margin: "30px 0" }}>
  <input
    type="text"
    placeholder="Search destinations or packages..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "60%",
      padding: "12px 20px",
      borderRadius: "25px",
      border: "1px solid #ccc",
      fontSize: "16px",
      outline: "none",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}
    
  />
</div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "36px",
          color: "#2c5364"
        }}
      >
        
        🌍 Explore Amazing Destinations
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "30px"
        }}
      >
         {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",   // important for image border radius
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            {/* ✅ IMAGE SECTION */}
            <img
  src={
    pkg.imageUrl
      ? `https://travelist-backend-i8zf.onrender.com/${pkg.imageUrl}`
      : "https://via.placeholder.com/400x250?text=No+Image"
  }
  alt={pkg.title}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "cover"
  }}
/>

            {/* ✅ CONTENT SECTION */}
            <div style={{ padding: "20px" }}>
              <h3 style={{ marginBottom: "10px", color: "#203a43" }}>
                {pkg.title}
              </h3>

              <p style={{ marginBottom: "8px", color: "#555" }}>
                <strong>Destination:</strong> {pkg.destinationName}
              </p>

              <p style={{ marginBottom: "15px", color: "#555" }}>
                <strong>Price:</strong> ₹{pkg.price}
              </p>

              <button
                onClick={() => navigate(`/package/${pkg.id}`)}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#2c5364",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%"
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;