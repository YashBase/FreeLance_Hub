// src/features/proposals/proposalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// 1️⃣ Fetch proposals for a client
export const fetchProposalsForClient = createAsyncThunk(
  "proposals/fetchProposalsForClient",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/proposals/client/${clientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2️⃣ Accept proposal (backend accepts one + rejects others + creates task)
export const acceptProposal = createAsyncThunk(
  "proposals/acceptProposal",
  async ({ proposalId, clientId }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/proposals/${proposalId}/accept`, null, {
        params: { clientId },
      });
      return response.data; // ✅ should include proposal + requirementId
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3️⃣ Reject proposal
export const rejectProposal = createAsyncThunk(
  "proposals/rejectProposal",
  async ({ proposalId, clientId }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/proposals/${proposalId}/reject`, null, {
        params: { clientId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const proposalSlice = createSlice({
  name: "proposals",
  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProposalState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Proposals
      .addCase(fetchProposalsForClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProposalsForClient.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsForClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Accept Proposal
      .addCase(acceptProposal.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProposal = action.payload;

        state.proposals = state.proposals.map((p) =>
          p.proposalId === updatedProposal.proposalId
            ? { ...p, status: "accepted" }
            : p.requirementId === updatedProposal.requirementId
              ? { ...p, status: "rejected" }
              : p
        );
      })
      .addCase(acceptProposal.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Reject Proposal
      .addCase(rejectProposal.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProposal = action.payload;
        state.proposals = state.proposals.map((p) =>
          p.proposalId === updatedProposal.proposalId
            ? { ...p, status: "rejected" }
            : p
        );
      })
      .addCase(rejectProposal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProposalState } = proposalSlice.actions;
export default proposalSlice.reducer;
