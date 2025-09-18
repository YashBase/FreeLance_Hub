// src/pages/vendor/RequirementPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMatchedRequirements,
  clearVendorRequirements,
} from "../../features/vendor/requirementSlice";
import { submitProposal } from "../../features/vendor/proposalSlice";
import Sidebar from "../../components/vendorSidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  RefreshCw,
  FileText,
  Send,
  X,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

export default function RequirementPage() {
  const dispatch = useDispatch();

  // 🔑 Vendor from auth slice (adapt to your shape)
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.vendorId ?? user?.id ?? user?.userId ?? null;

  // 📊 Requirements state
  const { requirements, loading, error } = useSelector(
    (state) => state.vendorRequirements
  );

  // ✉️ Proposal submitting state (only submitProposal is used)
  const {
    loading: proposalLoading,
    error: proposalError,
    success: proposalSuccess,
  } = useSelector((state) => state.vendorProposals || {});

  // 🧭 Sidebar state (to align main content)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 🔍 Filters
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortBy, setSortBy] = useState("budget");

  // 🧾 Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeReq, setActiveReq] = useState(null); // the requirement selected to propose
  const [summary, setSummary] = useState("");

  // Fetch requirements on mount and when vendorId appears
  useEffect(() => {
    if (vendorId) {
      dispatch(fetchMatchedRequirements({ vendorId, minBudget, maxBudget, sortBy }));
    }
    return () => dispatch(clearVendorRequirements());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, vendorId]);

  const handleFilter = () => {
    if (!vendorId) return;
    dispatch(fetchMatchedRequirements({ vendorId, minBudget, maxBudget, sortBy }));
  };

  const openProposalModal = (req) => {
    setActiveReq(req);
    setSummary("");
    setModalOpen(true);
  };

  const closeProposalModal = () => {
    if (proposalLoading) return; // prevent closing while submitting
    setModalOpen(false);
    setActiveReq(null);
    setSummary("");
  };

  const handleSubmitProposal = async () => {
    if (!vendorId || !activeReq?.reqId) return;
    await dispatch(
      submitProposal({
        vendorId,
        reqId: activeReq.reqId, // ensure backend expects "reqId"
        summary: summary.trim(),
      })
    ).unwrap()
      .then(() => {
        // Give a tiny success delay so user sees the check state
        setTimeout(() => {
          closeProposalModal();
        }, 400);
      })
      .catch(() => {
        // keep modal open to show error
      });
  };

  const mainMargin = useMemo(
    () => (sidebarOpen ? "ml-[250px]" : "ml-[80px]"),
    [sidebarOpen]
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (animated + fixed) */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${mainMargin} p-6`}>
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FileText className="w-7 h-7 text-blue-600" />
          Matched Requirements
        </motion.h2>

        {/* Vendor guard */}
        {!vendorId && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <AlertCircle className="w-5 h-5" />
            Please log in as a vendor to view and filter requirements.
          </div>
        )}

        {/* Filters */}
        <motion.div
          className="bg-white shadow-sm rounded-2xl p-5 mb-8 flex flex-wrap gap-6 items-end border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col w-40">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Min Budget
            </label>
            <input
              type="number"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 1000"
              disabled={!vendorId}
            />
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Max Budget
            </label>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 5000"
              disabled={!vendorId}
            />
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={!vendorId}
            >
              <option value="budget">Budget</option>
              <option value="deadline">Deadline</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleFilter}
              disabled={!vendorId || loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl shadow transition text-white ${
                !vendorId || loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Filter className="w-4 h-4" />
              Apply
            </button>
            <button
              onClick={() => {
                setMinBudget("");
                setMaxBudget("");
                setSortBy("budget");
                handleFilter();
              }}
              disabled={!vendorId || loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl shadow transition ${
                !vendorId || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Requirements List */}
        {loading && <p className="text-blue-600">Loading requirements...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && vendorId && requirements?.length === 0 && (
          <p className="text-gray-500">No matched requirements found.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requirements?.map((req, index) => (
            <motion.div
              key={req.reqId ?? index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                {req.title || "Requirement"}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Budget:</span> {req.budget}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Deadline:</span>{" "}
                {req.deadline || "N/A"}
              </p>
              <p className="text-sm text-gray-600 flex-1">
                <span className="font-medium">Description:</span>{" "}
                {req.description || "No description"}
              </p>

              <motion.button
                onClick={() => openProposalModal(req)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 transition"
                whileTap={{ scale: 0.98 }}
                disabled={!vendorId}
                title={!vendorId ? "Login as vendor to submit proposals" : "Submit Proposal"}
              >
                <Send className="w-4 h-4" />
                Submit Proposal
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Proposal Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProposalModal}
            />

            {/* Modal Card */}
            <motion.div
              className="relative z-10 w-[92%] max-w-xl rounded-2xl bg-white p-6 shadow-xl"
              initial={{ y: 40, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Close */}
              <button
                onClick={closeProposalModal}
                className="absolute right-3 top-3 rounded-full p-2 hover:bg-gray-100 transition"
                disabled={proposalLoading}
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="mb-4 flex items-center gap-2">
                <Send className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">Submit Proposal</h3>
              </div>

              <div className="mb-3 text-sm text-gray-600">
                <span className="font-medium">Requirement:</span>{" "}
                {activeReq?.title || `#${activeReq?.reqId}`}
              </div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Summary
              </label>
              <textarea
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe your approach, timeline, and any key details…"
                className="w-full resize-none rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={proposalLoading}
              />

              {/* Feedback */}
              <div className="min-h-[28px] mt-3">
                {proposalError && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {proposalError}
                  </div>
                )}
                {proposalSuccess && !proposalError && (
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <BadgeCheck className="w-4 h-4" />
                    Proposal submitted successfully!
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end gap-3">
                <motion.button
                  onClick={closeProposalModal}
                  className="rounded-xl bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 transition"
                  whileTap={{ scale: 0.98 }}
                  disabled={proposalLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmitProposal}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition ${
                    proposalLoading
                      ? "bg-green-400 cursor-wait"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  whileTap={{ scale: 0.98 }}
                  disabled={proposalLoading || !summary.trim()}
                  title={!summary.trim() ? "Please enter a summary" : "Submit"}
                >
                  <Send className="w-4 h-4" />
                  {proposalLoading ? "Submitting..." : "Submit"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
