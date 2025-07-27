import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Fetch proposals received by client using email
export const fetchProposalsByEmail = createAsyncThunk(
  "proposals/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/client/proposals/${email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch proposals");
    }
  }
);

const proposalsSlice = createSlice({
  name: "proposals",
  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProposalsByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default proposalsSlice.reducer;
