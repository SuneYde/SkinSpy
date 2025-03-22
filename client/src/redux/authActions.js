import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      // Make sure we set the Authorization header with the token
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get("/auth/check");
      return response.data;
    } catch (error) {
      localStorage.removeItem("token"); // Clear invalid token
      return rejectWithValue(
        error.response?.data?.error || "Authentication check failed"
      );
    }
  }
);

export const logout = () => {
  localStorage.removeItem("token");
  return { type: "auth/logout" };
};
