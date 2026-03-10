import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Services/api";

function Trips() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Load Data
  const fetchData = async () => {
    try {
      const packagesRes = await api.get("/Package");
      const destinationsRes = await api.get("/Destination");

      setPackages(packagesRes.data);
      setDestinations(destinationsRes.data);
    } catch (err) {
      console.log("Error loading data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create Package
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!imageFile && !imageUrl) {
      alert("Please upload image OR provide image URL");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("Title", title);
      formData.append("Price", price);
      formData.append("DurationInDays", durationInDays);
      formData.append("Details", details);
      formData.append("DestinationId", destinationId);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      } else {
        formData.append("ImageUrl", imageUrl);
      }

      await api.post("/Package", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Package Created Successfully!");

      // Reset form
      setTitle("");
      setPrice("");
      setDurationInDays("");
      setDetails("");
      setImageUrl("");
      setDestinationId("");
      setImageFile(null);

      // Reload packages
      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await api.delete(`/Package/${id}`);
      setPackages(packages.filter((pkg) => pkg.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Filter
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destinationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", background: "#f4f6f9" }}>
      <h2 style={{ marginBottom: "20px" }}>Trips Management</h2>

      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "30px" }}>
        Back to Dashboard
      </button>

      {/* ================= CREATE FORM ================= */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "40px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Add New Package</h3>

        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />

          <input
            type="number"
            placeholder="Duration (Days)"
            value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />

          <br /><br />

          {/* IMAGE SECTION */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <p style={{ margin: "10px 0" }}>OR</p>

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: "300px" }}
          />

          <br /><br />

          <textarea
            placeholder="Package Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="3"
            required
            style={{ width: "400px" }}
          />

          <br /><br />

          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            required
          >
            <option value="">Select Destination</option>
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>

          <button type="submit" style={{ marginLeft: "10px" }}>
            Add Package
          </button>
        </form>
      </div>

      {/* ================= SEARCH ================= */}

      <input
        type="text"
        placeholder="Search by title or destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "30px",
          width: "300px",
        }}
      />

      {/* ================= PACKAGE GRID ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <img
  src={
    pkg.imageUrl
      ? pkg.imageUrl.startsWith("http")
        ? pkg.imageUrl
        : `https://localhost:7036${pkg.imageUrl}`
      : "https://via.placeholder.com/400x200"
  }
  alt={pkg.title}
  style={{ width: "100%", height: "200px", objectFit: "cover" }}
/>

            <div style={{ padding: "20px" }}>
              <h3>{pkg.title}</h3>
              <p><strong>Destination:</strong> {pkg.destinationName}</p>
              <p><strong>Price:</strong> ₹{pkg.price}</p>
              <p><strong>Duration:</strong> {pkg.durationInDays} Days</p>

              <div style={{ marginTop: "15px" }}>
                <button onClick={() => navigate(`/trips/edit/${pkg.id}`)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pkg.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trips;