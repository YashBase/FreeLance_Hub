import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAuth from '../API/axiosAuth';

// 🔄 Fetch user by email (used after login)
export const fetchUserByEmail = createAsyncThunk(
  'auth/fetchUser',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(`/user/${email}`);
      console.log("✅ fetchUserByEmail response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ fetchUserByEmail failed:", error);
      return rejectWithValue(error.response?.data || "User fetch failed");
    }
  }
);

// 📝 Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    clientId: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.clientId = payload.clientId || null;

      // ✅ Always store user info in the same structure
      state.user = {
        userId: payload.userId,
        email: payload.email,
        fullName: payload.userName || "",      // <-- Correct key from backend
        contact: payload.contact || "",
        role: {
          roleId: payload.role?.roleId || payload.roleId,
          rname: payload.role?.rname || payload.roleName || "Client",
        },
      };

      state.error = null;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.clientId = null;
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        const payload = action.payload;
        state.loading = false;
        state.clientId = payload.clientId || null;

        state.user = {
          userId: payload.userId,
          email: payload.email,
          fullName: payload.userName || "",
          contact: payload.contact || "",
          role: {
            roleId: payload.roleId,
            rname: payload.roleName || "Client",
          },
        };

        state.isLoggedIn = true;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
