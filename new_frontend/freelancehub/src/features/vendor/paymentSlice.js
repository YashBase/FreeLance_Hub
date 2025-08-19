// src/features/vendor/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor"; // ✅ adjust path if needed

// Async thunk to fetch vendor payments
export const fetchVendorPayments = createAsyncThunk(
  "vendorPayments/fetchVendorPayments",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/payments/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch vendor payments"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "vendorPayments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorPayments: (state) => {
      state.payments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchVendorPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorPayments } = paymentSlice.actions;
export default paymentSlice.reducer;
