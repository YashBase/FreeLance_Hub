// src/features/vendor/vendorRequirementSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor"; // ✅ create axios instance for vendor API

// 1️⃣ Fetch matched requirements
export const fetchMatchedRequirements = createAsyncThunk(
  "vendor/fetchMatchedRequirements",
  async ({ vendorId, minBudget, maxBudget, sortBy }, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/${vendorId}/requirements`, {
        params: {
          minBudget,
          maxBudget,
          sortBy: sortBy || "budget",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch requirements"
      );
    }
  }
);

const vendorRequirementSlice = createSlice({
  name: "vendorRequirements",
  initialState: {
    requirements: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorRequirements: (state) => {
      state.requirements = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchedRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchedRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload;
      })
      .addCase(fetchMatchedRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorRequirements } = vendorRequirementSlice.actions;
export default vendorRequirementSlice.reducer;
