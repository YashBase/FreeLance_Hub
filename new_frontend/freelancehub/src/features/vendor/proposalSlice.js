// src/features/vendor/vendorProposalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor"; // ✅ Vendor axios instance

// 1️⃣ Submit Proposal
export const submitProposal = createAsyncThunk(
  "vendorProposals/submitProposal",
  async ({ vendorId, reqId, summary }, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.post("/proposals/submit", null, {
        params: { vendorId, reqId, summary },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit proposal"
      );
    }
  }
);

// 2️⃣ Get Proposal By ID
export const fetchProposalById = createAsyncThunk(
  "vendorProposals/fetchProposalById",
  async (proposalId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/proposals/${proposalId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch proposal"
      );
    }
  }
);

// 3️⃣ Get Proposals Submitted by a Vendor
export const fetchProposalsByVendor = createAsyncThunk(
  "vendorProposals/fetchProposalsByVendor",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/proposals/vendor/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor proposals"
      );
    }
  }
);

// 4️⃣ Get Proposals by Requirement
export const fetchProposalsByRequirement = createAsyncThunk(
  "vendorProposals/fetchProposalsByRequirement",
  async (reqId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/proposals/requirement/${reqId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch proposals for requirement"
      );
    }
  }
);

const vendorProposalSlice = createSlice({
  name: "vendorProposals",
  initialState: {
    proposals: [],
    currentProposal: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProposalState: (state) => {
      state.proposals = [];
      state.currentProposal = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Proposal
      .addCase(submitProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.proposals.push(action.payload); // add new proposal
      })
      .addCase(submitProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch Proposal By ID
      .addCase(fetchProposalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProposal = action.payload;
      })
      .addCase(fetchProposalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Proposals by Vendor
      .addCase(fetchProposalsByVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsByVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsByVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Proposals by Requirement
      .addCase(fetchProposalsByRequirement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsByRequirement.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsByRequirement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProposalState } = vendorProposalSlice.actions;
export default vendorProposalSlice.reducer;
