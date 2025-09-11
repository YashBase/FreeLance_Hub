// src/redux/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAdmin from "../../api/axiosAdmin";

// 1️⃣ Fetch dashboard counts
export const fetchDashboardCounts = createAsyncThunk(
  "admin/fetchDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.get("/counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching counts");
    }
  }
);

// 2️⃣ Fetch all non-admin users
export const fetchNonAdminUsers = createAsyncThunk(
  "admin/fetchNonAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.get("/non-admin");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching users");
    }
  }
);

// 3️⃣ Fetch filtered users
export const fetchFilteredUsers = createAsyncThunk(
  "admin/fetchFilteredUsers",
  async ({ role = "All", search = "" }, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.get("/filter", {
        params: { role, search }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error filtering users");
    }
  }
);

// 4️⃣ Update user status
export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.put(`/status/${userId}`, { status });
      return { userId, status: response.data.status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error updating status");
    }
  }
);

// 5️⃣ Fetch admin info
export const fetchAdminInfo = createAsyncThunk(
  "admin/fetchAdminInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.get("/admin/profile");
      return response.data; // should return { name: "...", email: "..." }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error fetching admin info");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    counts: null,
    users: [],
    loading: false,
    error: null,
    adminInfo: null, // ✅ added admin info
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Dashboard counts
    builder
      .addCase(fetchDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(fetchDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Non-admin users
    builder
      .addCase(fetchNonAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNonAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchNonAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Filtered users
    builder
      .addCase(fetchFilteredUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchFilteredUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update status
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, status } = action.payload;
        const index = state.users.findIndex(u => u.userId === userId);
        if (index !== -1) state.users[index].status = status;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Admin info
    builder
      .addCase(fetchAdminInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload;
      })
      .addCase(fetchAdminInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
