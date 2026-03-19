import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../Services/api";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/Auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>

      <Container maxWidth="sm">

        <Paper elevation={6} sx={{ p: 5, borderRadius: "16px" }}>
          {/* LOGO */}
  <img
    src="/travelist-logo.png"
    alt="Travelist"
    style={{
      height: "60px",
      display: "block",
      margin: "0 auto 20px"
    }}
  />

          <Typography variant="h4" align="center" fontWeight="bold">
            Welcome Back ✈️
          </Typography>

          <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
            Login to continue your journey with Travelist
          </Typography>

          <Box component="form" onSubmit={handleLogin}>

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: "30px",
                fontWeight: "bold",
                backgroundColor: "#111",
                "&:hover": { backgroundColor: "#333" }
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

            <Typography align="center" sx={{ mt: 3 }}>
              Don't have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/register")}
                underline="hover"
              >
                Create Account
              </Link>
            </Typography>

          </Box>

        </Paper>

      </Container>

    </div>
  );
}

export default Login;


/* PAGE BACKGROUND */

const pageWrapper = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg,#FFF8E1,#FFE082)"
};