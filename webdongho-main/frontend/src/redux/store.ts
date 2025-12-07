import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cartReducer from "../redux/cartSlice";
import profileReducer from "../redux/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
