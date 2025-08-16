// src/features/clientDashboard/clientDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

// 🔹 Helper to extract message safely
const extractErrorMessage = (err, defaultMsg) => {
  if (err.response?.data?.message) return err.response.data.message; // Spring Boot custom message
  if (typeof err.response?.data === 'string') return err.response.data; // plain string
  return defaultMsg;
};

// 🔹 Async thunk to fetch client dashboard summary
export const fetchClientDashboard = createAsyncThunk(
  'clientDashboard/fetchClientDashboard',
  async (clientId, { rejectWithValue }) => {
    try {
      // Full path: /api/client/dashboard/{clientId}
      const response = await axiosClient.get(`/client/dashboard/${clientId}`);
      return response.data; // ClientDashboardSummaryDTO
    } catch (err) {
      return rejectWithValue(
        extractErrorMessage(err, 'Failed to fetch client dashboard data')
      );
    }
  }
);

const clientDashboardSlice = createSlice({
  name: 'clientDashboard',
  initialState: {
    data: {
      totalCompletedTasks: 0,
      totalPaymentsMade: 0,
      averageRatingGiven: 0,
    },
    loading: false,
    error: null, // always a string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 FETCH CLIENT DASHBOARD
      .addCase(fetchClientDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchClientDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientDashboardSlice.reducer;
