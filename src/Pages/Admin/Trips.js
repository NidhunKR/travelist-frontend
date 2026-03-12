import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Services/api";

function Trips() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const packagesRes = await api.get("/api/package");
      const destinationsRes = await api.get("/api/destination");

      setPackages(packagesRes.data);
      setDestinations(destinationsRes.data);

    } catch (err) {
      console.log("Error loading data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      await api.post("/api/package", formData);

      alert("Package Created Successfully!");

      setTitle("");
      setPrice("");
      setDurationInDays("");
      setDetails("");
      setImageUrl("");
      setDestinationId("");
      setImageFile(null);

      fetchData();

    } catch (error) {
      console.log("Create error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await api.delete(`/api/package/${id}`);
      setPackages(packages.filter((pkg) => pkg.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destinationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={pageContainer}>

      <h2 style={titleStyle}>Trips Management ✈</h2>

      <button onClick={() => navigate("/dashboard")} style={backBtn}>
        ← Back to Dashboard
      </button>

      {/* CREATE PACKAGE */}

      <div style={formBox}>

        <h3>Add New Package</h3>

        <form onSubmit={handleCreate} style={formGrid}>

          <input
            type="text"
            placeholder="Package Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={input}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={input}
          />

          <input
            type="number"
            placeholder="Duration (Days)"
            value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
            required
            style={input}
          />

          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            required
            style={input}
          >
            <option value="">Select Destination</option>
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Package Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="3"
            required
            style={textarea}
          />

          <button type="submit" style={addBtn}>
            Add Package
          </button>

        </form>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search packages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInput}
      />

      {/* PACKAGE GRID */}

      <div style={grid}>

        {filteredPackages.map((pkg) => (

          <div key={pkg.id} style={card}>

            <img
              src={
                pkg.imageUrl
                  ? pkg.imageUrl.startsWith("http")
                    ? pkg.imageUrl
                    : `https://travelist-backend-i8zf.onrender.com/${pkg.imageUrl}`
                  : "https://via.placeholder.com/400x200"
              }
              alt={pkg.title}
              style={image}
            />

            <div style={{ padding: "20px" }}>

              <h3>{pkg.title}</h3>

              <p><strong>Destination:</strong> {pkg.destinationName}</p>
              <p><strong>Price:</strong> ₹{pkg.price}</p>
              <p><strong>Duration:</strong> {pkg.durationInDays} Days</p>

              <div style={cardButtons}>

                <button
                  onClick={() => navigate(`/trips/edit/${pkg.id}`)}
                  style={editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pkg.id)}
                  style={deleteBtn}
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


/* STYLES */

const pageContainer = {
  padding: "50px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "20px"
};

const backBtn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "20px",
  marginBottom: "30px",
  cursor: "pointer"
};

const formBox = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "40px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const formGrid = {
  display: "grid",
  gap: "12px"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const textarea = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const addBtn = {
  background: "#FFC107",
  color: "#111",
  border: "none",
  padding: "12px",
  borderRadius: "25px",
  fontWeight: "600",
  cursor: "pointer"
};

const searchInput = {
  padding: "12px",
  width: "300px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
  gap: "25px"
};

const card = {
  background: "white",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const image = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const cardButtons = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const editBtn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "20px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "20px",
  cursor: "pointer"
};