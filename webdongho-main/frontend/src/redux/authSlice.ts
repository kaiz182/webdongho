import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  register as apiRegister,
  User,
} from "../api/auth.api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  accessToken: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ---------------- LOGIN ----------------
export const loginUser = createAsyncThunk<
  { user: User; accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await apiLogin(email, password);
    if (!res.user || !res.accessToken) {
      return rejectWithValue("Invalid login response");
    }
    return { user: res.user, accessToken: res.accessToken };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ---------------- REGISTER ----------------
export const registerUser = createAsyncThunk<
  { userId: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await apiRegister(name, email, password);
      if (!res.userId) return rejectWithValue("Invalid register response");
      return { userId: res.userId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        // Lưu localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
