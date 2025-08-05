import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequirementsByEmail } from "../redux/requirementsSlice";
import { fetchProposalsByEmail, acceptProposal, rejectProposal } from "../redux/proposalsSlice";
import { fetchTasksByClientEmail } from "../redux/taskSlice";
import AddRequirementForm from "../Components/AddRequirementForm";
import axiosClient from "../API/axiosClient";
import 'bootstrap-icons/font/bootstrap-icons.css';

function ClientDashboard() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("requirements");
  const [vendorId, setVendorId] = useState("");
  const [rating, setRating] = useState("");

  const user = useSelector((state) => state.auth.user);
  const clientId = useSelector((state) => state.auth.clientId);

  const email = user?.email || "";

  const { requirements } = useSelector((state) => state.requirements);
  const { proposals } = useSelector((state) => state.proposals);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (email) {
      dispatch(fetchRequirementsByEmail(email));
      dispatch(fetchProposalsByEmail(email));
      dispatch(fetchTasksByClientEmail(email));
    }
  }, [email, dispatch]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/client/feedback", null, {
        params: {
          vendorId: parseInt(vendorId),
          clientId: clientId,
          rating: parseFloat(rating),
        },
      });
      alert(response.data); // Message from backend
      setVendorId("");
      setRating("");
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        👋 Welcome, <span className="text-primary">{user?.fullName || "Client"}</span>
      </h2>

      {/* Navigation Tabs */}
      <div className="btn-group d-flex justify-content-center mb-4" role="group">
        <button onClick={() => setTab("requirements")} className="btn btn-outline-primary">📄 Requirements</button>
        <button onClick={() => setTab("proposals")} className="btn btn-outline-success">📬 Proposals</button>
        <button onClick={() => setTab("tasks")} className="btn btn-outline-warning">📋 Tasks</button>
        <button onClick={() => setTab("feedback")} className="btn btn-outline-info">⭐ Feedback</button>
        <button onClick={() => setTab("profile")} className="btn btn-outline-dark">👤 Profile</button>
      </div>

      <hr />

      {/* === Requirements Section === */}
      {tab === "requirements" && (
        <>
          <h4 className="mb-3">📄 My Requirements</h4>
          <AddRequirementForm onRequirementAdded={() => dispatch(fetchRequirementsByEmail(email))} />

          {requirements.length === 0 ? (
            <p>No requirements yet.</p>
          ) : (
            <div className="row">
              {requirements.map((req) => (
                <div key={req.req_id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-primary shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">{req.title}</h5>
                      <p className="card-text">{req.description}</p>
                      <p><i className="bi bi-currency-rupee"></i> <strong>{req.budget}</strong></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* === Proposals Section === */}
      {tab === "proposals" && (
        <>
          <h4 className="mb-3">📬 Received Proposals</h4>
          {proposals.length === 0 ? (
            <p>No proposals received.</p>
          ) : (
            <div className="row">
              {proposals.map((p) => (
                <div key={p.proposalId} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-success shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Vendor #{p.vendor.vendor_id}</h5>
                      <p className="card-text">{p.summary}</p>
                      <span className={`badge mb-2 ${p.status === 'accepted' ? 'bg-success' : p.status === 'rejected' ? 'bg-danger' : 'bg-secondary'}`}>
                        {p.status.toUpperCase()}
                      </span>
                      {p.status === 'pending' && (
                        <div className="d-flex justify-content-between mt-2">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => dispatch(acceptProposal(p.proposalId))}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => dispatch(rejectProposal(p.proposalId))}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* === Tasks Section === */}
      {tab === "tasks" && (
        <>
          <h4 className="mb-3">📋 Tasks</h4>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
            <div className="row">
              {tasks.map((t) => (
                <div key={t.taskId} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-warning shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">{t.taskName}</h5>
                      <p className="card-text">{t.taskDescription}</p>
                      <p><strong>Start:</strong> {t.startDate}</p>
                      <p><strong>End:</strong> {t.endDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* === Feedback Section === */}
      {tab === "feedback" && (
        <>
          <h4 className="mb-3">⭐ Give Feedback</h4>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-3">
              <label className="form-label">Vendor ID</label>
              <input
                type="number"
                className="form-control"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating (0.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100">Submit Feedback</button>
          </form>
        </>
      )}

      {/* === Profile Section === */}
      {tab === "profile" && (
        <>
          <h4 className="mb-3">👤 Profile</h4>
          <div className="card border-dark shadow-sm p-3">
            <p><strong>Name:</strong> {user?.fullName || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Contact:</strong> {user?.contact}</p>
            <p><strong>Role:</strong> {user?.role?.rname || user?.role}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ClientDashboard;
