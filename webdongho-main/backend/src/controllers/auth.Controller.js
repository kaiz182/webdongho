import * as authService from "../services/auth.service.js";

// ----------------- REGISTER -----------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await authService.register({ name, email, password });

    if (result.message === "Email already exists") {
      return res.status(409).json(result);
    }

    if (result.message === "Server error") {
      return res.status(500).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Register controller error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await authService.login({ email, password });

    if (!result.accessToken) {
      return res.status(401).json({ message: result.message });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Login controller error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
