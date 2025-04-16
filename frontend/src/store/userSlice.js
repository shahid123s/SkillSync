import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAxiosInstance } from "../utils/userAxiosInstance";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))  : null,
  loading: false,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await userAxiosInstance.post("/login", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (userId, { rejectWithValue }) => {
    try {
      return await userAxiosInstance.post("/logout", userId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload;
        if (user.isBlocked) {
          state.user = null;
          state.isAuthenticated = false;
        } else {
          state.user = user;
          state.isAuthenticated = true;
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      // Logout Cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
