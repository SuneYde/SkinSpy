import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

// 🔹 LOGIN: Store token in HTTP-only cookie
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials, {
        withCredentials: true, // ✅ Sends & stores cookies automatically
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

// 🔹 REGISTER: Store token in HTTP-only cookie
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData, {
        withCredentials: true, // ✅ Sends & stores cookies automatically
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

// 🔹 CHECK AUTH: Validate user session (no manual token needed)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/check", {
        withCredentials: true, // ✅ Cookies are sent automatically
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Authentication check failed"
      );
    }
  }
);

// 🔹 LOGOUT: Clear session by removing HTTP-only cookie
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true }); // ✅ Backend clears cookie
      return { message: "Logged out successfully" };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);
