import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import balanceReducer from "./balanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
});

export default store;
