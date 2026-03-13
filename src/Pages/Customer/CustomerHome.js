import { useEffect, useState } from "react";
import API from "../../Services/api";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

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
      <div style={{ padding: "60px 20px" }}>

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
      {/* ABOUT PROJECT SECTION */}

<div style={aboutSection}>

  <h2 style={aboutTitle}>About Travelist 🚀</h2>

  <p style={aboutText}>
    Travelist is a modern full‑stack travel booking web application designed
    to help users explore destinations, discover travel packages, and search
    flights easily from one platform.
  </p>

  <p style={aboutText}>
    The frontend of this project is developed using <strong>React.js</strong>
    to build a responsive and interactive user interface. Styling and UI
    components are implemented using <strong>Material UI</strong> and modern
    CSS techniques.
  </p>

  <p style={aboutText}>
    The backend is powered by <strong>ASP.NET Core Web API</strong>, which
    handles authentication, travel package management, flight searching,
    and destination data management through RESTful APIs.
  </p>

  <p style={aboutText}>
    The application uses <strong>JWT Authentication</strong> for secure login
    and role-based access between Admin and Customer users. Data is stored
    in a <strong>SQL Server database</strong> and the application is deployed
    using modern cloud hosting services.
  </p>

  <p style={aboutText}>
    This project demonstrates full‑stack development concepts including
    API integration, authentication, database connectivity, responsive UI
    design, and real-world application deployment.
  </p>

</div>


{/* FOOTER */}

<div style={footer}>

  <h3 style={{marginBottom:"10px"}}>Travelist ✈</h3>

  <p style={{marginBottom:"20px"}}>
    Built with ❤️ using React, ASP.NET Core, and SQL Server
  </p>

  <div style={socialLinks}>

  <a href="https://www.instagram.com/ni_dhun__k__r/" target="_blank" rel="noopener noreferrer" style={iconLink}>
  <InstagramIcon style={iconStyle} />
</a>

<a href="https://github.com/NidhunKR" target="_blank" rel="noopener noreferrer" style={iconLink}>
  <GitHubIcon style={iconStyle} />
</a>

<a href="https://www.linkedin.com/in/nidhunkr/" target="_blank" rel="noopener noreferrer" style={iconLink}>
  <LinkedInIcon style={iconStyle} />
</a>

<a href="https://www.facebook.com/nidhunpry.sahara/" target="_blank" rel="noopener noreferrer" style={iconLink}>
  <FacebookIcon style={iconStyle} />
</a>

<a href="https://x.com/Nidhunkr1K" target="_blank" rel="noopener noreferrer" style={iconLink}>
  <XIcon style={iconStyle} />
</a>

</div>

  <p style={{marginTop:"20px",fontSize:"14px"}}>
    © 2026 Travelist Project
  </p>

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
  fontSize: "clamp(28px, 6vw, 46px)",
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
  padding: "20px",
  borderRadius: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
  gap: "15px",
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
  width: "100%",
  maxWidth: "500px",
  padding: "12px 22px",
  borderRadius: "30px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "clamp(24px,5vw,32px)",
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
  transition: "transform 0.25s ease",
};

packageCard[':hover'] = {
  transform: "translateY(-6px)"
};

const packageImage = {
  width: "100%",
  height: "180px",
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
const aboutSection = {
  padding: "80px 20px",
  background: "#FFF8E1",
  textAlign: "center"
};

const aboutTitle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "25px",
  color: "#222"
};

const aboutText = {
  maxWidth: "850px",
  margin: "12px auto",
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#555"
};

const footer = {
  background: "#111",
  color: "white",
  textAlign: "center",
  padding: "40px 20px"
};

const socialLinks = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap"
};

const iconLink = {
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const iconStyle = {
  fontSize: "clamp(24px,5vw,32px)",
  cursor: "pointer",
  transition: "0.3s"
};