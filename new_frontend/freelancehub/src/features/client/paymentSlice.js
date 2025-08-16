import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Fetch payment history for logged-in client
export const fetchPaymentHistory = createAsyncThunk(
  "payment/fetchPaymentHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth.user?.userId; // automatically use logged-in clientId
      if (!clientId) throw new Error("Client not logged in");

      const response = await axiosClient.get(`/payment/history/${clientId}`);
      // Make sure we return an array
      return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Make a new payment
export const makePayment = createAsyncThunk(
  "payment/makePayment",
  async ({ vendorId, taskId, amount }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth.user?.userId;
      if (!clientId) throw new Error("Client not logged in");

      const response = await axiosClient.post(
        `/payment/make`,
        null,
        {
          params: { clientId, vendorId, taskId, amount },
        }
      );

      // Return newly added payment
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    history: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.history = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;

        // Log the fetched payment history with details
        console.log("✅ Payment history fetched:", action.payload);
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Make Payment
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // reset success flag on new request
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.history.push(action.payload); // append new payment

        // Log the new payment added, with property names to display data easily
        console.log("✅ New payment made:", {
          id: action.payload.id || action.payload.paymentId,
          vendorId: action.payload.vendorId,
          taskId: action.payload.taskId,
          amount: action.payload.amount,
          date: action.payload.date || action.payload.createdAt,
          status: action.payload.status,
          // add other relevant properties here as per your payload structure
        });
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearPaymentState, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
