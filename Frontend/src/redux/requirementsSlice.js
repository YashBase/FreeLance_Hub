import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Async Thunk: Fetch requirements by client email
export const fetchRequirementsByEmail = createAsyncThunk(
  "requirements/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/client/requirements/${email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch requirements");
    }
  }
);

const requirementsSlice = createSlice({
  name: "requirements",
  initialState: {
    requirements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequirementsByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequirementsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload;
      })
      .addCase(fetchRequirementsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requirementsSlice.reducer;
