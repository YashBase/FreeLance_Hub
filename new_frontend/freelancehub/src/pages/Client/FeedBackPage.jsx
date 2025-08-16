// src/pages/client/ClientFeedbackPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitFeedback,
  fetchFeedbackHistory,
  clearSubmitState,
  clearError,
} from "../../features/client/vendorfeedbackSlice";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

export default function ClientFeedbackPage() {
  const dispatch = useDispatch();
  const { feedbackList, loading, error, submitSuccess } = useSelector(
    (state) => state.vendorFeedback
  );
  const auth = useSelector((state) => state.auth); // persisted auth slice
  const [vendorId, setVendorId] = useState("");
  const [rating, setRating] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const clientId = auth.user?.userId;

  // Fetch feedback history for logged-in client
  useEffect(() => {

    if (clientId) {
      dispatch(fetchFeedbackHistory()); // thunk automatically uses clientId from authSlice
    }
  }, [dispatch, clientId]);

  // Clear success/error messages after 3s
  useEffect(() => {
    if (submitSuccess || error) {
      const timer = setTimeout(() => {
        dispatch(clearSubmitState());
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendorId || !rating) return alert("Please fill all fields");

    dispatch(submitFeedback({ vendorId, rating })); // clientId comes from authSlice internally
    setVendorId("");
    setRating("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className="flex-1 p-8 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 250 : 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6">Submit Feedback</h1>

          {/* Feedback Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold">Vendor ID</label>
              <input
                type="number"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter Vendor ID"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter Rating (1-5)"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {/* Success/Error */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold mb-4"
            >
              Feedback submitted successfully!
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 font-semibold mb-4"
            >
              {typeof error === "string"
                ? error
                : error.message || JSON.stringify(error)}
            </motion.div>
          )}

          {/* Feedback History */}
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users size={20} /> Your Feedback History
          </h2>
          <div className="space-y-4">
            {loading && feedbackList.length === 0 && <p>Loading...</p>}
            {!loading && feedbackList.length === 0 && (
              <p>No feedback submitted yet.</p>
            )}

            {Array.isArray(feedbackList) &&
              feedbackList.map((feedback) => {
                // Ensure valid date
                const createdAt = feedback.createdAt
                  ? new Date(feedback.createdAt).toLocaleString()
                  : "N/A";

                return (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded p-4 bg-gray-50 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <span className="font-semibold">Vendor:</span>{" "}
                        {feedback.vendorName || feedback.vendorId}
                      </p>
                      <p className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500" />
                        <span className="font-semibold">Rating:</span>{" "}
                        {feedback.rating}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span> {createdAt}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
