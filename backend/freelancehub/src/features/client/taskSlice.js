import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Fetch tasks for a client
export const fetchClientTasks = createAsyncThunk(
  "tasks/fetchClientTasks",
  async ({ clientId }, { rejectWithValue }) => {
    console.log("Thunk called with clientId:", clientId);
    try {
      const response = await axiosClient.get(`/client/tasks/${clientId}`);
      console.log("API Response data:", response.data); // 🔹 Debug log
      return response.data; // Should be array
    } catch (error) {
      console.error("Fetch Tasks Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTaskState: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTasks.pending, (state) => {
        console.log("tasks:",state.tasks)
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientTasks.fulfilled, (state, action) => {
        console.log("Thunk Fulfilled, payload:", action.payload); // 🔹 Debug
        state.loading = false;
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchClientTasks.rejected, (state, action) => {
        console.error("Thunk Rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskState } = taskSlice.actions;
export default taskSlice.reducer;
