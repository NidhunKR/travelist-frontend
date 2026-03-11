import { useEffect, useState } from "react";
import api from "../../Services/api";

function DestinationManagement() {

  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Load Destinations
  const fetchDestinations = async () => {
    try {
      const res = await api.get("/api/Destination");
      setDestinations(res.data);
    } catch (err) {
      console.log("Error loading destinations:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Add or Update Destination
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    if (editingId) {

      await api.put(`/api/Destination/${editingId}`, formData);

      alert("Destination updated!");

    } else {

      await api.post("/api/Destination", formData);

      alert("Destination added!");

    }

    setName("");
    setDescription("");
    setImageFile(null);
    setEditingId(null);

    fetchDestinations();

  } catch (err) {

    console.log("Save error:", err.response?.data);
    alert("Operation failed");

  }
};

  // Edit
  const handleEdit = (destination) => {
    setEditingId(destination.id);
    setName(destination.name);
    setDescription(destination.description || "");
  };

  // Delete
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {

      await api.delete(`/api/Destination/${id}`);

      alert("Deleted successfully!");

      fetchDestinations();

    } catch (err) {

      console.log("Delete error:", err);
      alert("Delete failed");

    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h2 style={{ marginBottom: "25px" }}>Destination Management</h2>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "40px"
        }}
      >

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Destination Name"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="3"
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: editingId ? "#ff9800" : "#2c5364",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {editingId ? "Update Destination" : "Add Destination"}
        </button>

      </form>

      {/* DESTINATION LIST */}

      {destinations.map(dest => (

        <div
          key={dest.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

            {dest.imageUrl && (
              <img
                src={`https://travelist-backend-i8zf.onrender.com${dest.imageUrl}`}
                alt={dest.name}
                width="70"
                style={{ borderRadius: "6px" }}
              />
            )}

            <div>

              <h4 style={{ margin: 0 }}>{dest.name}</h4>

              <p style={{ margin: 0, color: "#666" }}>
                {dest.description}
              </p>

            </div>

          </div>

          <div style={{ display: "flex", gap: "10px" }}>

            <button
              onClick={() => handleEdit(dest)}
              style={{
                padding: "6px 10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(dest.id)}
              style={{
                padding: "6px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DestinationManagement;