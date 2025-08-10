import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../API/axiosClient";

// 🔄 Fetch proposals received by client using email
export const fetchProposalsByEmail = createAsyncThunk(
  "proposals/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/proposals/${email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch proposals");
    }
  }
);

// 🔄 Fetch proposals by requirement ID (for filter dropdown)
export const fetchProposalsByRequirementId = createAsyncThunk(
  "proposals/fetchByRequirementId",
  async (reqId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/proposals/by-requirement/${reqId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch proposals by requirement");
    }
  }
);

// ✅ Accept proposal
export const acceptProposal = createAsyncThunk(
  "proposals/accept",
  async (proposalId, { rejectWithValue }) => {
    try {
      await axiosClient.post(`/accept-proposal/${proposalId}`);
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
      await axiosClient.post(`/reject-proposal/${proposalId}`);
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
      // 📥 Fetch proposals by email
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

      // 📥 Fetch proposals by requirement ID
      .addCase(fetchProposalsByRequirementId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsByRequirementId.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsByRequirementId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Accept proposal
      .addCase(acceptProposal.fulfilled, (state, action) => {
        const { proposalId, status } = action.payload;
        // Accept selected proposal and reject others
        state.proposals = state.proposals.map((p) =>
          p.proposalId === proposalId
            ? { ...p, status }
            : { ...p, status: "rejected" }
        );
      })

      // ❌ Reject proposal
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
