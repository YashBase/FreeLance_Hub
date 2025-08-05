import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../API/axiosClient";

// 🔄 Fetch proposals received by client using email
export const fetchProposalsByEmail = createAsyncThunk(
  "proposals/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/client/proposals/${email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch proposals");
    }
  }
);

// ✅ Accept proposal
export const acceptProposal = createAsyncThunk(
  "proposals/accept",
  async (proposalId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/client/accept-proposal/${proposalId}`);
      return { proposalId, status: "accepted" };
    } catch (err) {
      return rejectWithValue("Failed to accept proposal");
    }
  }
);

// ✅ Reject proposal
export const rejectProposal = createAsyncThunk(
  "proposals/reject",
  async (proposalId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/client/reject-proposal/${proposalId}`);
      return { proposalId, status: "rejected" };
    } catch (err) {
      return rejectWithValue("Failed to reject proposal");
    }
  }
);

const proposalsSlice = createSlice({
  name: "proposals",
  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 FETCH proposals
      .addCase(fetchProposalsByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Accept proposal
      .addCase(acceptProposal.fulfilled, (state, action) => {
        const { proposalId, status } = action.payload;
        const proposal = state.proposals.find((p) => p.proposalId === proposalId);
        if (proposal) {
          proposal.status = status;
        }
      })

      // ✅ Reject proposal
      .addCase(rejectProposal.fulfilled, (state, action) => {
        const { proposalId, status } = action.payload;
        const proposal = state.proposals.find((p) => p.proposalId === proposalId);
        if (proposal) {
          proposal.status = status;
        }
      })

      .addCase(acceptProposal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(rejectProposal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default proposalsSlice.reducer;
