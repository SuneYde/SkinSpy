// /user/active-skins
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const getActiveSkins = createAsyncThunk(
  "user/getActiveSkins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/active-skins", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error fetching active skins"
      );
    }
  }
);
