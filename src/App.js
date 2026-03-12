import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";

import Dashboard from "./Pages/Admin/Dashboard";
import Trips from "./Pages/Admin/Trips";
import EditTrip from "./Pages/Admin/EditTrip";
import AdminBookings from "./Pages/Admin/AdminBookings";
import DestinationManagement from "./Pages/Admin/DestinationManagement";

import Packages from "./Pages/PackageDetails/Packages";
import PackageDetails from "./Pages/PackageDetails/PackageDetails";

import CustomerHome from "./Pages/Customer/CustomerHome";
import MyBookings from "./Pages/Customer/MyBookings";

import Flights from "./Pages/Flight/Flights";
import MyFlightBookings from "./Pages/Flight/MyFlightBookings";
import FlightResults from "./Pages/Flight/FlightResults";

import Navbar from "./Components/Navbar";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token"); // ✅ fixed
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <Router>

      {/* Global Navbar */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/package/:id" element={<PackageDetails />} />

        <Route path="/flights" element={<Flights />} />
        <Route path="/flight-results" element={<FlightResults />} />

        {/* User Routes */}
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute requiredRole="User">
              <MyBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-flight-bookings"
          element={
            <PrivateRoute requiredRole="User">
              <MyFlightBookings />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="Admin">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <PrivateRoute requiredRole="Admin">
              <Trips />
            </PrivateRoute>
          }
        />

        <Route
          path="/packages"
          element={
            <PrivateRoute requiredRole="Admin">
              <Packages />
            </PrivateRoute>
          }
        />

        <Route
          path="/trips/edit/:id"
          element={
            <PrivateRoute requiredRole="Admin">
              <EditTrip />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-bookings"
          element={
            <PrivateRoute requiredRole="Admin">
              <AdminBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <PrivateRoute requiredRole="Admin">
              <DestinationManagement />
            </PrivateRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;