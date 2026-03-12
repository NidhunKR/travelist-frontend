import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={navbarWrapper}>
      <div style={navbarContainer}>

        {/* LOGO */}
        <div style={logoBox} onClick={() => navigate("/")}>
          <img
            src="/travelist-logo.png"
            alt="Travelist"
            style={logo}
          />
          <h1>travelist</h1>
        </div>

        {/* NAV ACTIONS */}
        <div style={navActions}>

          {token && role === "User" && (
            <button
              onClick={() => navigate("/my-bookings")}
              style={navBtn}
            >
              My Bookings
            </button>
          )}

          {token && role === "Admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              style={navBtn}
            >
              Admin Panel
            </button>
          )}

          {token ? (
            <button onClick={handleLogout} style={mainBtn}>
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={mainBtn}
            >
              Login
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default Navbar;


/* ================= STYLES ================= */

const navbarWrapper = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  background: "#FFC107",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  
};

const navbarContainer = {
  maxWidth: "1200px",
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 24px"
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
};

const logo = {
  height: "48px",
  width: "auto",
  objectFit: "contain"
};

const navActions = {
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

const navBtn = {
  padding: "9px 18px",
  borderRadius: "22px",
  border: "none",
  background: "#ffffff",
  color: "#222",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  transition: "all 0.2s ease"
};

const mainBtn = {
  padding: "9px 22px",
  borderRadius: "22px",
  border: "none",
  background: "#111",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  letterSpacing: "0.5px",
  transition: "all 0.2s ease"
};
