// src/pages/RequirementPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyRequirements,
  postRequirement,
  clearPostState,
} from "../../features/client/requirementSlice";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { Plus, FileText, Layers, X } from "lucide-react";

export default function RequirementPage() {
  const dispatch = useDispatch();

  // Redux state
  const {
    requirements,
    loading,
    error,
    postLoading,
    postError,
    lastPostedRequirement,
  } = useSelector((state) => state.requirement);

  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form toggle
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillNames: [""],
  });

  // Modal state
  const [selectedReq, setSelectedReq] = useState(null);

  // Fetch requirements on load
  useEffect(() => {
    dispatch(fetchMyRequirements());
  }, [dispatch]);

  // Reset form after post success
  useEffect(() => {
    if (lastPostedRequirement) {
      setFormData({ title: "", description: "", budget: "", skillNames: [""] });
      setTimeout(() => dispatch(clearPostState()), 2000);
      setShowForm(false);
    }
  }, [lastPostedRequirement, dispatch]);

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const updated = [...formData.skillNames];
    updated[index] = value;
    setFormData({ ...formData, skillNames: updated });
  };

  const addSkill = () => {
    setFormData({ ...formData, skillNames: [...formData.skillNames, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requirementData = {
      title: formData.title,
      description: formData.description,
      budget: formData.budget,
      skillNames: formData.skillNames.filter((s) => s.trim() !== ""),
    };
    dispatch(postRequirement(requirementData));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className="flex-1 p-8 transition-all duration-300 overflow-y-auto"
        style={{ marginLeft: sidebarOpen ? 250 : 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Layers className="text-blue-600" /> My Requirements
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              {showForm ? "Hide Form" : "Add Requirement"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 border p-6 rounded-lg shadow-inner mb-8 space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <div>
                <label className="font-semibold">Skills</label>
                {formData.skillNames.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="w-full border p-2 rounded mt-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  + Add Skill
                </button>
              </div>

              <button
                type="submit"
                disabled={postLoading}
                className="w-full py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                {postLoading ? "Posting..." : "Post Requirement"}
              </button>

              {postError && <p className="text-red-500">{postError}</p>}
              {lastPostedRequirement && (
                <p className="text-green-600">Requirement posted successfully!</p>
              )}
            </motion.form>
          )}

          {/* Requirement List */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FileText className="text-green-600" /> My Posted Requirements
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading requirements...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : requirements.length === 0 ? (
            <p className="text-gray-500">No requirements posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements.map((req) => (
                <motion.div
                  key={req.reqId}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedReq(req)}
                  className="bg-white border rounded-xl shadow-md p-6 flex flex-col cursor-pointer hover:shadow-lg"
                >
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{req.title}</h4>
                  <p className="text-gray-600 truncate">{req.description}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    💰 <span className="font-semibold">Budget:</span> {req.budget}
                  </p>
                  {req.skills?.length > 0 && (
                    <p className="mt-1 text-sm text-blue-600">
                      🛠 <span className="font-semibold">Skills:</span>{" "}
                      {req.skills.map((s) => s.skillName).join(", ")}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal for Requirement Details */}
      {selectedReq && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 w-96 relative"
          >
            <button
              onClick={() => setSelectedReq(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-3">{selectedReq.title}</h2>
            <p className="text-gray-700 mb-4">{selectedReq.description}</p>
            <p className="text-gray-800 mb-2">
              💰 <span className="font-semibold">Budget:</span> {selectedReq.budget}
            </p>
            {selectedReq.skills?.length > 0 && (
              <p className="text-blue-600">
                🛠 <span className="font-semibold">Skills:</span>{" "}
                {selectedReq.skills.map((s) => s.skillName).join(", ")}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
