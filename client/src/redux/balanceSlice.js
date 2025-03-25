import { createSlice } from "@reduxjs/toolkit";
import { getBalance } from "./balanceActions";

const initialState = {
  balance: null,
  error: null,
  isLoading: false,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = balanceSlice.actions;

export default balanceSlice.reducer;
