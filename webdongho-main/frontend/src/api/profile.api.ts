// src/api/profile.api.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // base URL backend

// ---------------- TYPES ----------------
export interface Profile {
  id: string;
  user_id: string;
  avatar_url?: string | null;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
  created_at?: string;
}

// ---------------- GET PROFILE ----------------
export const getProfile = async (user_id: string): Promise<Profile> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_URL}/profiles/${user_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ---------------- CREATE PROFILE ----------------
export const createProfile = async (formData: FormData): Promise<Profile> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${API_URL}/profiles`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ---------------- UPDATE PROFILE ----------------
export const updateProfile = async (
  user_id: string,
  formData: FormData
): Promise<Profile> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.put(`${API_URL}/profiles/${user_id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
