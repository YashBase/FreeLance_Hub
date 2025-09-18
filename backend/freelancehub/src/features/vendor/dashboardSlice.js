// src/features/vendor/vendorDashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor";

// 1️⃣ Fetch vendor dashboard summary
export const fetchVendorDashboard = createAsyncThunk(
  "vendorDashboard/fetchVendorDashboard",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.auth.user;

      if (!user || !user.vendorId) {
        return rejectWithValue("Vendor ID not found in auth state");
      }

      const response = await axiosVendor.get(`/vendor/dashboard/${user.vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor dashboard"
      );
    }
  }
);

// 2️⃣ Slice definition
const vendorDashboardSlice = createSlice({
  name: "vendorDashboard",
  initialState: {
    dashboard: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorDashboard: (state) => {
      state.dashboard = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchVendorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching vendor dashboard";
      });
  },
});

export const { clearVendorDashboard } = vendorDashboardSlice.actions;

// ✅ Selectors
export const selectVendorDashboard = (state) => state.vendorDashboard.dashboard;
export const selectVendorDashboardLoading = (state) =>
  state.vendorDashboard.loading;
export const selectVendorDashboardError = (state) =>
  state.vendorDashboard.error;

export default vendorDashboardSlice.reducer;
