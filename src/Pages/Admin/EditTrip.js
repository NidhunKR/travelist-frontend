import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Services/api";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [destinations, setDestinations] = useState([]);

  // Load Package
  useEffect(() => {
    api.get(`/api/package/${id}`)
      .then(res => {
        const pkg = res.data;
        setTitle(pkg.title);
        setPrice(pkg.price);
        setDurationInDays(pkg.durationInDays);
        setDestinationId(pkg.destinationId);
        setDetails(pkg.details || "");
        setCurrentImage(pkg.imageUrl);
      })
      .catch(err => console.log("Error loading package:", err));
  }, [id]);

  // Load Destinations
  useEffect(() => {
    api.get("/api/destination")
      .then(res => setDestinations(res.data))
      .catch(err => console.log("Error loading destinations:", err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", Number(price));
    formData.append("durationInDays", Number(durationInDays));
    formData.append("destinationId", Number(destinationId));
    formData.append("details", details);

    if (image) {
      formData.append("imageFile", image);
    }

    try {
      await api.put(`/api/package/${id}`, formData);
      alert("Package updated successfully!");
      navigate("/trips");
    } catch (error) {
      console.log("Update error:", error.response?.data);
      alert("Failed to update package");
    }
  };

  return (
    <div style={pageContainer}>

      <div style={card}>

        <h2 style={titleStyle}>Edit Package ✏</h2>

        <button
          onClick={() => navigate("/trips")}
          style={backBtn}
        >
          ← Back
        </button>

        <form onSubmit={handleUpdate} style={form}>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            style={input}
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            style={input}
          />

          <input
            type="number"
            value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
            placeholder="Duration in Days"
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
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details"
            rows="4"
            required
            style={textarea}
          />

          {/* Current Image */}
          {currentImage && (
            <div>
              <p style={{fontWeight:"600"}}>Current Image</p>
              <img
                src={`https://travelist-backend-i8zf.onrender.com/${currentImage}`}
                alt="Current"
                style={imageStyle}
              />
            </div>
          )}

          {/* Upload New Image */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" style={updateBtn}>
            Update Package
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditTrip;


/* STYLES */

const pageContainer = {
  background: "#FFF8E1",
  minHeight: "100vh",
  padding: "60px"
};

const card = {
  maxWidth: "600px",
  margin: "auto",
  background: "white",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const titleStyle = {
  marginBottom: "10px"
};

const backBtn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "20px",
  marginBottom: "20px",
  cursor: "pointer"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
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

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const updateBtn = {
  padding: "12px",
  background: "#FFC107",
  color: "#111",
  border: "none",
  borderRadius: "25px",
  fontWeight: "600",
  cursor: "pointer"
};