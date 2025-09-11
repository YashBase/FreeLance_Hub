// src/pages/client/ProposalPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProposalsForClient,
  acceptProposal,
  rejectProposal,
} from "../../features/client/proposalSlice"; // ✅ fixed path
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, FileText } from "lucide-react";

export default function ProposalPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { proposals, loading, error } = useSelector((state) => state.proposals);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchProposalsForClient(user.clientId));
    }
  }, [dispatch, user]);

  const handleAccept = (proposalId) => {
    dispatch(acceptProposal({ proposalId, clientId: user.clientId }));
  };

  const handleReject = (proposalId) => {
    dispatch(rejectProposal({ proposalId, clientId: user.clientId }));
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-600" size={26} />
            My Proposals
          </h2>

          {/* Loading & Error States */}
          {loading && <p className="text-gray-500">Loading proposals...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Proposal Cards */}
          {!loading && !error && (
            <>
              {proposals.length === 0 ? (
                <p className="text-gray-600">No proposals found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {proposals.map((proposal, index) => (
                    <motion.div
                      key={proposal.proposalId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {proposal.summary}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Requirement:{" "}
                        <span className="font-medium text-gray-800">
                          {proposal.requirement?.title || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        Status:{" "}
                        <span
                          className={`font-medium px-2 py-1 rounded-md ${
                            proposal.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : proposal.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </p>

                      {/* Action Buttons */}
                      {proposal.status === "pending" ? (
                        <div className="flex gap-3 mt-3">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAccept(proposal.proposalId)}
                            disabled={loading}
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-md disabled:opacity-50"
                          >
                            <CheckCircle size={18} /> Accept
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(proposal.proposalId)}
                            disabled={loading}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md disabled:opacity-50"
                          >
                            <XCircle size={18} /> Reject
                          </motion.button>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          Decision already made for this proposal.
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
