import React, { useEffect, useState } from "react";

const API = "https://localhost:7036/api/Package";

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div style={pageContainer}>
      <h2 style={title}>Travel Packages 🌍</h2>

      <div style={gridContainer}>
        {packages.map((pkg) => (
          <div key={pkg.id} style={card}>

            <div style={imagePlaceholder}>
              {pkg.destinationName?.charAt(0)}
            </div>

            <h3 style={cardTitle}>{pkg.title}</h3>

            <p style={destination}>
              📍 {pkg.destinationName}
            </p>

            <p style={price}>
              ₹{pkg.price}
            </p>

            <button style={viewButton}>
              View Details
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;

/* STYLES */

const pageContainer = {
  padding: "40px 60px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px",
  color: "#222"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
  gap: "25px"
};

const card = {
  background: "white",
  borderRadius: "16px",
  padding: "25px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const imagePlaceholder = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "#FFC107",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
  margin: "auto",
  marginBottom: "15px",
  color: "#222"
};

const cardTitle = {
  fontSize: "20px",
  marginBottom: "8px"
};

const destination = {
  color: "#666",
  marginBottom: "10px"
};

const price = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#111",
  marginBottom: "15px"
};

const viewButton = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "600"
};