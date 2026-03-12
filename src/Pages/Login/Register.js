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

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await API.post("/api/Auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful!");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }
  };

  return (
    <div style={pageWrapper}>

      <Container maxWidth="sm">

        <Paper elevation={6} sx={{ p: 5, borderRadius: "16px" }}>

          {/* LOGO */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src="/travelist-logo.png"
              alt="Travelist"
              style={{ height: "60px" }}
            />
          </Box>

          <Typography variant="h4" align="center" fontWeight="bold">
            Create Account ✈️
          </Typography>

          <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
            Start your journey with Travelist
          </Typography>

          <Box component="form" onSubmit={handleRegister}>

            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              required
              onChange={(e) => setName(e.target.value)}
            />

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
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: "30px",
                fontWeight: "bold",
                backgroundColor: "#111",
                "&:hover": { backgroundColor: "#333" }
              }}
            >
              Register
            </Button>

            <Typography align="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/login")}
                underline="hover"
              >
                Login
              </Link>
            </Typography>

          </Box>

        </Paper>

      </Container>

    </div>
  );
}

export default Register;


/* PAGE BACKGROUND */

const pageWrapper = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg,#FFF8E1,#FFE082)"
};