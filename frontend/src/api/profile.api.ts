import axios from "axios";

const API_URL = "http://localhost:5000/api/profile";

// ---------------- TYPES ----------------
export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email?: string;
  phone: string;
  address: string;
  gender: "male" | "female" | "other";
}

export interface ProfileResponse extends Profile {}
export interface UpdateProfileResponse {
  message: string;
  profile: Profile;
}

// ---------------- GET MY PROFILE ----------------
export const getMyProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // backend trả thẳng profile object
};

// ---------------- UPDATE PROFILE ----------------
export const updateMyProfile = async (data: {
  full_name?: string;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
}): Promise<UpdateProfileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.put(`${API_URL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
