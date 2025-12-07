import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        // Lấy token từ header Authorization: "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");

        // Lưu thông tin user vào request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        next(); // chuyển sang route tiếp theo
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default authMiddleware;
