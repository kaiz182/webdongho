import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // đổi URL nếu backend khác

// ---------------- User ----------------
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

// ---------------- Login Response ----------------
export interface LoginResponse {
  message: string;
  accessToken?: string;
  user?: User;
}

// ---------------- Register Response ----------------
export interface RegisterResponse {
  message: string;
  userId?: string;
}

// ---------------- LOGIN ----------------
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      return { message: err.response.data.message };
    }
    return { message: "Login failed" };
  }
};

// ---------------- REGISTER ----------------
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const res = await axios.post<RegisterResponse>(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      return { message: err.response.data.message };
    }
    return { message: "Register failed" };
  }
};
