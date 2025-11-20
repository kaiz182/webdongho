import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // đổi URL nếu backend khác

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  accessToken?: string;
  user?: User;
}

export interface RegisterResponse {
  message: string;
  userId?: string;
}

// ---------------- LOGIN ----------------
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

// ---------------- REGISTER ----------------
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const res = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return res.data;
};
