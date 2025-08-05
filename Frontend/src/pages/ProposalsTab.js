import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProposalsByEmail,
  acceptProposal,
  rejectProposal,
} from '../redux/proposalsSlice';

function ProposalsTab() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const { proposals, loading, error } = useSelector((state) => state.proposals);

  useEffect(() => {
    if (email) {
      dispatch(fetchProposalsByEmail(email));
    }
  }, [dispatch, email]);

  const handleAccept = (proposalId) => {
    dispatch(acceptProposal(proposalId));
  };

  const handleReject = (proposalId) => {
    dispatch(rejectProposal(proposalId));
  };

  return (
    <div>
      <h2>Proposals</h2>

      {loading && <p>Loading proposals...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && proposals.length === 0 && <p>No proposals available.</p>}

      {proposals.map((proposal) => (
        <div key={proposal.proposalId} style={styles.card}>
          <p><strong>Requirement:</strong> {proposal.requirementTitle}</p>
          <p><strong>Summary:</strong> {proposal.summary}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span style={{
              color:
                proposal.status === 'accepted' ? 'green' :
                proposal.status === 'rejected' ? 'red' :
                'orange',
              fontWeight: 'bold',
            }}>
              {proposal.status.toUpperCase()}
            </span>
          </p>

          {proposal.status === 'pending' && (
            <div style={styles.buttonGroup}>
              <button onClick={() => handleAccept(proposal.proposalId)} style={styles.acceptBtn}>Accept</button>
              <button onClick={() => handleReject(proposal.proposalId)} style={styles.rejectBtn}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '15px 0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  buttonGroup: {
    marginTop: '10px',
  },
  acceptBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '6px 12px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rejectBtn: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProposalsTab;
