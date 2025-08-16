// src/features/client/vendorFeedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient"; 

// 1️⃣ Submit feedback (clientId comes from authSlice state)
export const submitFeedback = createAsyncThunk(
  "vendorFeedback/submitFeedback",
  async ({ vendorId, rating }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth.user?.userId; // assuming authSlice stores user object with id
      if (!clientId) throw new Error("Client not logged in");

      const response = await axiosClient.post("/feedback/submit", null, {
        params: { clientId, vendorId, rating },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2️⃣ Fetch feedback history by logged-in client
export const fetchFeedbackHistory = createAsyncThunk(
  "vendorFeedback/fetchFeedbackHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth.user?.id;
      if (!clientId) throw new Error("Client not logged in");

      const response = await axiosClient.get(`/feedback/client/${clientId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  feedbackList: [],
  loading: false,
  error: null,
  submitSuccess: false,
};

const vendorFeedbackSlice = createSlice({
  name: "vendorFeedback",
  initialState,
  reducers: {
    clearSubmitState: (state) => {
      state.submitSuccess = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.submitSuccess = false;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
        state.feedbackList.push(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeedbackHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackList = action.payload;
      })
      .addCase(fetchFeedbackHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmitState, clearError } = vendorFeedbackSlice.actions;

export default vendorFeedbackSlice.reducer;
