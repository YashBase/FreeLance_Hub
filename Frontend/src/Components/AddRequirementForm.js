import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AddRequirementForm({ onRequirementAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        description,
        budget: parseFloat(budget),
        client: { user: { user_id: user.user_id } }
      };

      await axios.post("http://localhost:8080/api/requirements", payload);
      alert("Requirement added!");
      setTitle("");
      setDescription("");
      setBudget("");
      onRequirementAdded(); // ✅ Refresh the list in ClientDashboard
    } catch (err) {
      console.error("Add requirement error:", err);
      alert("Failed to add requirement.");
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
