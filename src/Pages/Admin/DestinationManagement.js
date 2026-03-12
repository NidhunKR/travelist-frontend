import { useEffect, useState } from "react";
import api from "../../Services/api";

function DestinationManagement() {

  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // only send image if user selects new image
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

  const handleEdit = (destination) => {
  setEditingId(destination.id);
  setName(destination.name);
  setDescription(destination.description || "");
  setImageFile(null); // reset file input
};

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
    <div style={pageContainer}>

      <h2 style={title}>Destination Management 🌍</h2>

      {/* FORM */}

      <form onSubmit={handleSubmit} style={formBox}>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Destination Name"
          required
          style={inputStyle}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="3"
          style={textareaStyle}
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          style={editingId ? updateBtn : addBtn}
        >
          {editingId && (
  <button
    type="button"
    onClick={() => {
      setEditingId(null);
      setName("");
      setDescription("");
      setImageFile(null);
    }}
    style={{
      padding: "10px",
      borderRadius: "25px",
      border: "none",
      background: "#ccc",
      cursor: "pointer"
    }}
  >
    Cancel Edit
  </button>
)}
          {editingId ? "Update Destination" : "Add Destination"}
        </button>

      </form>

      {/* DESTINATIONS */}

      <div style={gridContainer}>

        {destinations.map(dest => (

          <div key={dest.id} style={card}>

            {dest.imageUrl && (
              <img
                src={`https://travelist-backend-i8zf.onrender.com/${dest.imageUrl}`}
                alt={dest.name}
                style={image}
              />
            )}

            <h3 style={cardTitle}>{dest.name}</h3>

            <p style={desc}>{dest.description}</p>

            <div style={actionRow}>

              <button
                onClick={() => handleEdit(dest)}
                style={editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(dest.id)}
                style={deleteBtn}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DestinationManagement;


/* STYLES */

const pageContainer = {
  padding: "50px",
  background: "#FFF8E1",
  minHeight: "100vh"
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
  fontWeight: "700",
  color: "#111"
};

const formBox = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const addBtn = {
  background: "#111",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "600"
};

const updateBtn = {
  background: "#FFC107",
  color: "#111",
  padding: "12px",
  border: "none",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "600"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  gap: "22px"
};

const card = {
  background: "white",
  borderRadius: "14px",
  padding: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const image = {
  width: "100%",
  height: "140px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const cardTitle = {
  marginBottom: "6px"
};

const desc = {
  color: "#666",
  fontSize: "14px",
  marginBottom: "14px"
};

const actionRow = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const editBtn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer"
};