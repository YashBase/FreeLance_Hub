import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../API/axiosClient";

// ✅ Fetch tasks by client email
export const fetchTasksByClientEmail = createAsyncThunk(
  "tasks/fetchByClientEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/tasks/${email}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch tasks");
    }
  }
);

// ✅ Fetch tasks by requirement ID (for filter dropdown)
export const fetchTasksByRequirementId = createAsyncThunk(
  "tasks/fetchByRequirementId",
  async (reqId, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/tasks/by-requirement/${reqId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch tasks by requirement");
    }
  }
);

// ✅ Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch by email
      .addCase(fetchTasksByClientEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksByClientEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByClientEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Fetch by requirement
      .addCase(fetchTasksByRequirementId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksByRequirementId.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByRequirementId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
