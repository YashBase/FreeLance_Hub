// src/features/requirement/requirementSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient'; // baseURL = http://localhost:8082/api

// ✅ Fetch all requirements of the logged-in client
export const fetchMyRequirements = createAsyncThunk(
  'requirement/fetchMyRequirements',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth?.user?.userId; // 👈 fixed here

      if (!clientId) {
        throw new Error('Client ID not found in state. Please login again.');
      }

      const response = await axiosClient.get(`/requirements/my/${clientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong while fetching requirements'
      );
    }
  }
);

// ✅ Post a new requirement
export const postRequirement = createAsyncThunk(
  'requirement/postRequirement',
  async (requirementData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const clientId = state.auth?.user?.userId; // 👈 fixed here

      if (!clientId) {
        throw new Error('Client ID not found in state. Please login again.');
      }

      const payload = {
        ...requirementData,
        skillIds: requirementData.skillIds || [],
      };

      const response = await axiosClient.post(
        `/requirements/post/${clientId}`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong while posting requirement'
      );
    }
  }
);

const requirementSlice = createSlice({
  name: 'requirement',
  initialState: {
    requirements: [],
    loading: false,
    error: null,
    postLoading: false,
    postError: null,
    lastPostedRequirement: null,
  },
  reducers: {
    clearPostState: (state) => {
      state.postLoading = false;
      state.postError = null;
      state.lastPostedRequirement = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload || [];
      })
      .addCase(fetchMyRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postRequirement.pending, (state) => {
        state.postLoading = true;
        state.postError = null;
      })
      .addCase(postRequirement.fulfilled, (state, action) => {
        state.postLoading = false;
        state.lastPostedRequirement = action.payload;

        if (action.payload) {
          state.requirements.push(action.payload);
        }
      })
      .addCase(postRequirement.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = action.payload;
      });
  },
});

export const { clearPostState } = requirementSlice.actions;
export default requirementSlice.reducer;
