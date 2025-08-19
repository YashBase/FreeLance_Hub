// src/features/payment/paymentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// 🔹 Create a pending payment when task is completed
export const createPendingPayment = createAsyncThunk(
  "payments/createPendingPayment",
  async ({ taskId, amount }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/payments/pending/${taskId}`, null, {
        params: { amount },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create pending payment");
    }
  }
);

// 🔹 Confirm payment (mark as PAID)
export const confirmPayment = createAsyncThunk(
  "payments/confirmPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/payments/confirm/${paymentId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to confirm payment");
    }
  }
);

// 🔹 Fetch all payments for a client
export const fetchPaymentsByClient = createAsyncThunk(
  "payments/fetchPaymentsByClient",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/payments/client/${clientId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch client payments");
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Create Pending Payment
      .addCase(createPendingPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPendingPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPendingPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Confirm Payment
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.payments.findIndex(
          (p) => p.paymentId === action.payload.paymentId
        );
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch Payments By Client
      .addCase(fetchPaymentsByClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByClient.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsByClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentsSlice.actions;
export default paymentsSlice.reducer;
