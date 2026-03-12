import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Trips from "./Pages/PackageDetails/Trips";
import Packages from "./Pages/PackageDetails/Packages";
import EditTrip from "./Pages/Admin/EditTrip";
import CustomerHome from "./Pages/Customer/CustomerHome";
import PackageDetails from "./Pages/PackageDetails/PackageDetails";
import MyBookings from "./Pages/Customer/MyBookings";
import AdminBookings from "./Pages/Admin/AdminBookings";
import Navbar from "./Components/Navbar";
import DestinationManagement from "./Pages/Admin/DestinationManagement";
import Flights from "./Pages/Flight/Flights";
import MyFlightBookings from "./Pages/Flight/MyFlightBookings";
import FlightResults from "./Pages/Flight/FlightResults";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <Router>
      {/* ✅ Global Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/admin/destinations" element={<DestinationManagement />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights" element={<FlightResults />} />
        <Route
  path="/my-flight-bookings"
  element={
    <PrivateRoute requiredRole="User">
      <MyFlightBookings />
    </PrivateRoute>
  }
/>

        {/* User Routes */}
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute requiredRole="User">
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-bookings"
          element={
            <PrivateRoute requiredRole="Admin">
              <AdminBookings />
            </PrivateRoute>
          }
        />

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
      </Routes>
    </Router>
  );
}

export default App;