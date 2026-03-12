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
    <Container maxWidth="sm">

      <Paper elevation={4} sx={{ p: 4, mt: 10 }}>

        <Typography variant="h4" align="center" gutterBottom>
          Create Account ✈
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
            label="Email"
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
            sx={{ mt: 3 }}
          >
            Register
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </Typography>

        </Box>

      </Paper>

    </Container>
  );
}

export default Register;