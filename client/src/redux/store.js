import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import balanceReducer from "./balanceSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    user: userReducer,
  },
});

export default store;
