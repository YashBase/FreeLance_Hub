import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../API/axiosClient";

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
      });
  },
});

export default taskSlice.reducer;
