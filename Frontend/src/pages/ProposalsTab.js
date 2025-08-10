import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProposalsByClientId,
  fetchProposalsByRequirement,
  acceptProposal,
  rejectProposal,
} from "../redux/proposalsSlice";
import { fetchRequirementsByEmail } from "../redux/requirementsSlice";

function ProposalsTab() {
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.auth.user?.userId);
  const clientEmail = useSelector((state) => state.auth.user?.email);
  const proposals = useSelector((state) => state.proposals.proposals);
  const requirements = useSelector((state) => state.requirements.requirements);

  const [selectedRequirement, setSelectedRequirement] = useState(null);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchProposalsByClientId(clientId));
    }
    if (clientEmail) {
      dispatch(fetchRequirementsByEmail(clientEmail));
    }
  }, [dispatch, clientId, clientEmail]);

  useEffect(() => {
    if (selectedRequirement && selectedRequirement.reqId) {
      dispatch(fetchProposalsByRequirement(selectedRequirement.reqId));
    }
  }, [dispatch, selectedRequirement]);

  const handleAccept = (proposalId) => {
    dispatch(acceptProposal(proposalId));
  };

  const handleReject = (proposalId) => {
    dispatch(rejectProposal(proposalId));
  };

  return (
    <div>
      <h2>Proposals</h2>

      {/* Dropdown for selecting requirement */}
      <div className="form-group">
        <label htmlFor="requirementSelect">Select Requirement:</label>
        <select
          id="requirementSelect"
          className="form-control"
          onChange={(e) => {
            const reqId = parseInt(e.target.value);
            const req = requirements.find((r) => r.reqId === reqId);
            setSelectedRequirement(req);
          }}
          value={selectedRequirement?.reqId || ""}
        >
          <option value="">-- Select a Requirement --</option>
          {requirements.map((req) => (
            <option key={req.reqId} value={req.reqId}>
              {req.title}
            </option>
          ))}
        </select>
      </div>

      {/* Proposals list */}
      <div className="row">
        {proposals && proposals.length > 0 ? (
          proposals.map((p) => (
            <div className="col-md-4" key={p.proposalId}>
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">
                    Vendor: {p.vendor?.user?.fullName || "N/A"}
                  </h5>
                  <p><strong>Requirement:</strong> {p.requirement?.title}</p>
                  <p><strong>Description:</strong> {p.description}</p>
                  <p><strong>Proposed Budget:</strong> ₹{p.proposedBudget}</p>
                  <p><strong>Status:</strong> {p.status}</p>
                  {p.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => handleAccept(p.proposalId)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(p.proposalId)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-3">No proposals to display.</p>
        )}
      </div>
    </div>
  );
}

export default ProposalsTab;
