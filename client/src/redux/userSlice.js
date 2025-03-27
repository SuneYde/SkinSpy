import { createSlice } from "@reduxjs/toolkit";
import { getActiveSkins } from "./userActions";

const initialState = {
  activeSkins: [],
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveSkins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActiveSkins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeSkins = action.payload;
      })
      .addCase(getActiveSkins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
