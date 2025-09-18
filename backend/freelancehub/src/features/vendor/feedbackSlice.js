// src/features/vendor/vendorFeedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor"; // ✅ use your custom axios instance

// ✅ Fetch all feedback for a vendor
export const fetchVendorFeedback = createAsyncThunk(
  "vendorFeedback/fetchVendorFeedback",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/feedback/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch vendor feedback"
      );
    }
  }
);

// ✅ Fetch average rating for a vendor
export const fetchVendorAverageRating = createAsyncThunk(
  "vendorFeedback/fetchVendorAverageRating",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/feedback/${vendorId}/average-rating`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch average rating"
      );
    }
  }
);

const vendorFeedbackSlice = createSlice({
  name: "vendorFeedback",
  initialState: {
    feedback: [],
    averageRating: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorFeedbackState: (state) => {
      state.feedback = [];
      state.averageRating = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ fetch feedback
      .addCase(fetchVendorFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(fetchVendorFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ fetch average rating
      .addCase(fetchVendorAverageRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.averageRating = action.payload;
      })
      .addCase(fetchVendorAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorFeedbackState } = vendorFeedbackSlice.actions;

export default vendorFeedbackSlice.reducer;
