// src/features/vendor/vendorTaskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosVendor from "../../api/axiosVendor"; // ✅ your vendor axios instance

// 1️⃣ Fetch Accepted Tasks (DTO)
export const fetchAcceptedTasks = createAsyncThunk(
  "vendorTasks/fetchAcceptedTasks",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/tasks/accepted/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch accepted tasks");
    }
  }
);

// 2️⃣ Fetch All Tasks (DTO)
export const fetchAllTasks = createAsyncThunk(
  "vendorTasks/fetchAllTasks",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.get(`/vendor/tasks/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch all tasks");
    }
  }
);

// 3️⃣ Update Task Status
export const updateTaskStatus = createAsyncThunk(
  "vendorTasks/updateTaskStatus",
  async ({ taskId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosVendor.put(
        `/vendor/tasks/${taskId}/status?newStatus=${newStatus}`
      );
      return response.data; // ✅ returns updated DTO
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task status");
    }
  }
);

// Slice
const vendorTaskSlice = createSlice({
  name: "vendorTasks",
  initialState: {
    acceptedTasks: [],
    allTasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Accepted Tasks
      .addCase(fetchAcceptedTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAcceptedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptedTasks = action.payload;
      })
      .addCase(fetchAcceptedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch All Tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.allTasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Update Task Status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;

        // 🔄 Update in both acceptedTasks & allTasks if present
        state.acceptedTasks = state.acceptedTasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        );
        state.allTasks = state.allTasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        );
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = vendorTaskSlice.actions;
export default vendorTaskSlice.reducer;
