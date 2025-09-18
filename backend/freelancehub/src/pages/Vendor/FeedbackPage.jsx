// src/pages/VendorFeedbackPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorFeedback,
  fetchVendorAverageRating,
  clearVendorFeedbackState,
} from "../../features/vendor/feedbackSlice"; // ✅ existing slice
import Sidebar from "../../components/vendorSidebar"; // ✅ your sidebar
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

export default function VendorFeedbackPage() {
  const dispatch = useDispatch();

  // VendorId from auth slice
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.vendorId ?? user?.id ?? user?.userId ?? null;

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { feedback = [], averageRating, loading, error } = useSelector(
    (state) => state.Feedback
  );

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorFeedback(vendorId));
      dispatch(fetchVendorAverageRating(vendorId));
    }
    return () => {
      dispatch(clearVendorFeedbackState());
    };
  }, [dispatch, vendorId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <main
        className={`flex-1 p-8 transition-all duration-300`}
        style={{ marginLeft: sidebarOpen ? 260 : 90 }} // ✅ adjust spacing dynamically
      >
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Vendor Feedback
        </motion.h1>

        {/* Average Rating */}
        <div className="mb-8 flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Star className="text-yellow-500" />
          Average Rating:{" "}
          {loading
            ? "Loading..."
            : averageRating
            ? `${averageRating.toFixed(1)} / 5`
            : "No rating yet"}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Feedback List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>Loading feedback...</p>
          ) : feedback.length > 0 ? (
            feedback.map((f, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="text-blue-500" />
                  <span className="font-medium text-gray-800">{f.clientName || "Anonymous"}</span>
                </div>

                {/* Task link */}
                {f.taskLink && (
                  <p className="text-sm text-blue-600 underline mb-2">
                    <a href={f.taskLink} target="_blank" rel="noreferrer">
                      View Task
                    </a>
                  </p>
                )}

                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < f.rating ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No feedback available</p>
          )}
        </div>
      </main>
    </div>
  );
}
