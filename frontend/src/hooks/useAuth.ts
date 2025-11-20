import { useState } from "react";
import {
  login,
  register,
  LoginResponse,
  RegisterResponse,
  User,
} from "../api/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  });

  // ----- Login -----
  const handleLogin = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res: LoginResponse = await login(email, password);
      if (res.accessToken && res.user) {
        localStorage.setItem("token", res.accessToken);
        setState({
          user: res.user,
          token: res.accessToken,
          loading: false,
          error: null,
        });
      } else {
        setState((prev) => ({ ...prev, loading: false, error: res.message }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || "Login failed",
      }));
    }
  };

  // ----- Register -----
  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res: RegisterResponse = await register(name, email, password);
      if (res.userId) {
        setState((prev) => ({ ...prev, loading: false, error: null }));
      } else {
        setState((prev) => ({ ...prev, loading: false, error: res.message }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || "Register failed",
      }));
    }
  };

  // ----- Logout -----
  const handleLogout = () => {
    localStorage.removeItem("token");
    setState({ user: null, token: null, loading: false, error: null });
  };

  return {
    ...state,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
