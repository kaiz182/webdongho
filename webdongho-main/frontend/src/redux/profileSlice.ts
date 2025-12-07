// src/redux/slices/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export interface Profile {
  id: string;
  user_id: string;
  avatar_url?: string | null;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface ProfileState {
  profile?: Profile;
  loading: boolean;
  error?: string;
}

const initialState: ProfileState = {
  profile: undefined,
  loading: false,
  error: undefined,
};

export const fetchProfile = createAsyncThunk<Profile, string>(
  "profile/fetchProfile",
  async (user_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/profiles/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Profile;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create profile
export const createProfile = createAsyncThunk<Profile, FormData>(
  "profile/createProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/profiles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data as Profile;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk<
  Profile,
  { user_id: string; data: FormData }
>("profile/updateProfile", async ({ user_id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put(`/profiles/${user_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data as Profile;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        createProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
