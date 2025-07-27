import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Async thunk: fetch tasks assigned to this client
export const fetchTasksByClientEmail = createAsyncThunk(
  "tasks/fetchByClientEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/client/tasks/${email}`);
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
        state.error = null;
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
