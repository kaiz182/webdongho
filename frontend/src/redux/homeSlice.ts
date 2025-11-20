import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login as apiLogin, register as apiRegister } from "../api/auth.api";

export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

// --------------------- LOGIN ASYNC THUNK ---------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiLogin(email, password);
      return res; // { message, accessToken, user }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// --------------------- REGISTER ASYNC THUNK ---------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRegister(name, email, password);
      return res; // { message, userId }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// ===================== SLICE =====================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    // ---------------- LOGIN ----------------
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.accessToken = action.payload.accessToken || null;

        if (action.payload.accessToken) {
          localStorage.setItem("token", action.payload.accessToken);
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- REGISTER ----------------
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
