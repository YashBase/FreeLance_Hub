import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../API/axiosClient";

export const fetchRequirementsByEmail = createAsyncThunk(
  "requirements/fetchByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/requirements/${email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch requirements");
    }
  }
);

export const createRequirement = createAsyncThunk(
  "requirements/create",
  async (requirementData, { getState, rejectWithValue }) => {
    try {
      const clientId = getState().auth.clientId;
      if (!clientId) throw new Error("Client ID missing in Redux");

      const payload = {
        ...requirementData,
        client: { clientId }, // ✅ Matches backend model
      };

      const response = await axiosClient.post("/requirement/add", payload);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create requirement");
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
      })
      .addCase(fetchRequirementsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload;
      })
      .addCase(fetchRequirementsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRequirement.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequirement.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements.push(action.payload); // Optional: add new to list
      })
      .addCase(createRequirement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requirementsSlice.reducer;
