// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAuth from '../../api/axiosAuth';

// 🔹 Helper to extract message safely
const extractErrorMessage = (err, defaultMsg) => {
  if (err.response?.data?.message) return err.response.data.message; // Spring Boot custom message
  if (typeof err.response?.data === 'string') return err.response.data; // plain string
  return defaultMsg;
};

// 🔹 Login User (handles Client, Vendor, Admin)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post('/login', { email, password });
      return response.data; // SessionResponse from backend
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err, 'Login failed'));
    }
  }
);

// 🔹 Register User (Client or Vendor — Admin usually not registered here)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post('/register', registerData);
      return response.data; // SessionResponse from backend
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err, 'Registration failed'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,    // Holds full SessionResponse from backend
    roleId: null,  // ROLE_CLIENT_ID = 1, ROLE_VENDOR_ID = 2, ROLE_ADMIN_ID = 3
    loading: false,
    error: null,   // Always a string
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.roleId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 🔹 LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.roleId = action.payload.roleId;

        // Optional: You can log for debugging
        if (action.payload.roleId === 3) {
          console.log("✅ Admin login detected:", action.payload.userName);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.roleId = action.payload.roleId;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
