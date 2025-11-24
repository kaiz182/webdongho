import { useState, useEffect } from "react";
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
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setState((prev) => ({
        ...prev,
        user: JSON.parse(savedUser),
        token: savedToken,
      }));
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res: LoginResponse = await login(email, password);

      if (res.accessToken && res.user) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));

        setState({
          user: res.user,
          token: res.accessToken,
          loading: false,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: res.message,
        }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || "Login failed",
      }));
    }
  };

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
        setState((prev) => ({
          ...prev,
          loading: false,
          error: res.message,
        }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || "Register failed",
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...state,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
