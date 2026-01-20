import { useState } from "react";
import axios from "../../utils/axiosInterceptor";
import "../../styles/AdminProblems.css";

const AdminProblems = () => {
  const [title, setTitle] = useState("");
  const [driveLink, setDriveLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/problems", { title, driveLink });
      alert("Problem created successfully");
      setTitle("");
      setDriveLink("");
    } catch {
      alert("Failed to create problem");
    }
  };

  return (
    <div className="admin-problems-page">
      <h2 className="page-title">Create Problem Statement</h2>

      <form className="problem-card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Problem Title</label>
          <input
            placeholder="Enter problem title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Google Drive Link</label>
          <input
            type="url"
            placeholder="Paste Google Drive link"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="create-btn">
          Create Problem
        </button>
      </form>
    </div>
  );
};

export default AdminProblems;
