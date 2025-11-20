import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// ----------------- REGISTER -----------------
export const register = async ({ name, email, password }) => {
    try {
        if (!name || !email || !password) {
            return { message: "Missing required fields" };
        }

        // Kiểm tra email trùng
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return { message: "Email already exists" };

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới, role mặc định = "customer"
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "customer", // luôn mặc định customer
        });

        return { message: "Registration successful", userId: newUser.id };
    } catch (error) {
        console.error("Register service error:", error);
        return { message: "Server error" };
    }
};

// ----------------- LOGIN -----------------
export const login = async ({ email, password }) => {
    try {
        if (!email || !password) return { message: "Missing required fields" };

        const user = await User.findOne({ where: { email } });
        if (!user) return { message: "User not found" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { message: "Wrong password" };

        // Tạo JWT
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "7d" }
        );

        return {
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role, // trả về role luôn
            },
        };
    } catch (error) {
        console.error("Login service error:", error);
        return { message: "Server error" };
    }
};
