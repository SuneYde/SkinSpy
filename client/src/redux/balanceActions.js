import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("validation/validated-balance", {
        withCredentials: true,
      });

      // Ensure response data exists and does not have an error
      if (response.data.error) {
        console.error(response.data.error);
        return rejectWithValue(response.data.error);
      }

      return response.data.balance;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Balance fetch failed"
      );
    }
  }
);
