// src/pages/vendor/ProposalPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProposalsByVendor,
  fetchProposalById,
  fetchProposalsByRequirement,
} from "../../features/vendor/proposalSlice";
import VendorSidebar from "../../components/vendorSidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ListChecks,
  Loader2,
  BadgeCheck,
  XCircle,
  Clock,
} from "lucide-react";

export default function ProposalPage() {
  const dispatch = useDispatch();
  const { proposals, currentProposal, loading, error } = useSelector(
    (state) => state.vendorProposals
  );

  // 🔑 Vendor from auth slice (adapt to your shape)
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.vendorId ?? user?.id ?? user?.userId ?? null;

  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchProposalsByVendor(vendorId));
    }
  }, [dispatch, vendorId]);

  const handleViewProposal = (proposalId) => {
    dispatch(fetchProposalById(proposalId));
    setSelectedProposal(proposalId);
  };

  const handleFilterByRequirement = (reqId) => {
    dispatch(fetchProposalsByRequirement(reqId));
    setSelectedProposal(null);
  };

  // 🎨 Status badge styling
  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <BadgeCheck className="w-3 h-3" /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r hidden md:block">
        <VendorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <motion.h1
          className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FileText className="w-8 h-8 text-blue-600" />
          My Proposals
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            <span className="ml-3 text-gray-600 text-lg">
              Loading your proposals...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Proposals List */}
        {!loading && proposals?.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {proposals.map((proposal) => (
              <motion.div
                key={proposal.proposalId}
                className={`p-5 bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-xl border transition ${
                  selectedProposal === proposal.proposalId
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleViewProposal(proposal.proposalId)}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {proposal.requirementTitle || "Untitled Requirement"}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {proposal.summary || "No summary provided"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  {statusBadge(proposal.status)}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterByRequirement(proposal.requirementId);
                    }}
                    className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                  >
                    <ListChecks className="w-4 h-4" /> View All
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FileText className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-lg">No proposals found yet.</p>
              <p className="text-sm">Submit proposals to see them here.</p>
            </motion.div>
          )
        )}

        {/* Sliding Panel for Proposal Details */}
        <AnimatePresence>
          {currentProposal && selectedProposal && (
            <motion.div
              className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Proposal Details
                </h2>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p>
                  <strong>Requirement:</strong>{" "}
                  {currentProposal.requirementTitle || "N/A"}
                </p>
                <p>
                  <strong>Summary:</strong>{" "}
                  {currentProposal.summary || "No summary"}
                </p>
                <p>
                  <strong>Status:</strong> {statusBadge(currentProposal.status)}
                </p>
                <p>
                  <strong>Submitted On:</strong>{" "}
                  {currentProposal.createdAt
                    ? new Date(currentProposal.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
