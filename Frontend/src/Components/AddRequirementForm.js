import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../API/axiosClient";

function AddRequirementForm({ onRequirementAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const user = useSelector((state) => state.auth.user);
  const baseURL = "http://localhost:8081/api/requirement"

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Safety check
    if (!user || !user.userId) {
      alert("❌ Client ID missing! Make sure you're logged in as a Client.");
      console.error("Missing clientId in Redux state:", user);
      return;
    }

    const payload = {
      title,
      description,
      budget: parseFloat(budget),
      userid: user.userId
      
    };

    console.log("📦 Sending requirement payload:", payload);

    try {
      await axiosClient.post(baseURL+"/add", payload);
      alert("✅ Requirement added successfully!");
      setTitle("");
      setDescription("");
      setBudget("");
      onRequirementAdded(); // Refresh the list
    } catch (err) {
      console.error("❌ Add requirement error:", err);
      if (err.response) {
        alert("🚫 Backend error: " + err.response.data.message || "Unknown backend error");
      } else {
        alert("❌ Failed to add requirement. Make sure your backend (8081) is running.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded shadow-sm bg-light">
      <h5 className="mb-3">➕ Add New Requirement</h5>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Budget (₹)</label>
        <input
          type="number"
          className="form-control"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        Submit Requirement
      </button>
    </form>
  );
}

export default AddRequirementForm;
