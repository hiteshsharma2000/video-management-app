import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:2200/video/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Upload successful!");
        navigate('/videos')
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file.");
    }

    setUploading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
      <h2>Upload Video</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      ></textarea>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "10px 20px",
          background: uploading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default Upload;
