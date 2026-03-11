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

  // 🔹 Load Package Details
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

  // 🔹 Load Destinations
  useEffect(() => {
    api.get("/api/destination")
      .then(res => setDestinations(res.data))
      .catch(err => console.log("Error loading destinations:", err));
  }, []);

  // 🔹 Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", Number(price));
    formData.append("durationInDays", Number(durationInDays));
    formData.append("destinationId", Number(destinationId));
    formData.append("details", details);

    // ✅ Must match DTO property name
    if (image) {
      formData.append("imageFile", image);
    }

    try {
      // ✅ DO NOT set headers manually
      await api.put(`/api/package/${id}`, formData);

      alert("Package updated successfully!");
      navigate("/trips");

    } catch (error) {
      console.log("Update error:", error.response?.data);
      alert("Failed to update package");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Edit Package</h2>

      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <input
          type="number"
          value={durationInDays}
          onChange={(e) => setDurationInDays(e.target.value)}
          placeholder="Duration in Days"
          required
        />

        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          required
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
        />

        {/* Current Image */}
        {currentImage && (
          <div>
            <p>Current Image:</p>
            <img
              src={`https://travelist-backend-i8zf.onrender.com/${currentImage}`}
              alt="Current"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "10px"
              }}
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2c5364",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Update Package
        </button>

      </form>
    </div>
  );
}

export default EditTrip;