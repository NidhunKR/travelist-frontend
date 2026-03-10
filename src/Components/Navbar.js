import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  const navBtn = {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontWeight: "500",
    backdropFilter: "blur(6px)",
    transition: "all 0.3s ease"
    
  };

  const primaryBtn = {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    color: "white",
    fontWeight: "600",
    transition: "all 0.3s ease"
  };

  const logoutBtn = {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "white",
    fontWeight: "600",
    transition: "all 0.3s ease"
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 80px",
        background: "rgba(15, 32, 39, 0.9)",
        backdropFilter: "blur(10px)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}
    >
      {/* Logo */}
      <h2
        style={{
          cursor: "pointer",
          letterSpacing: "1.5px",
          fontWeight: "700"
        }}
        onClick={() => navigate("/")}
      >
        ✈ Travelist
      </h2>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} style={primaryBtn}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;