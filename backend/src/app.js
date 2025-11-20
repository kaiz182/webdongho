import express from "express";
import cors from "cors";
import reviewRouter from "./routes/review.routes.js";
import authRouter from "./routes/auth.routes.js";
import watchRouter from "./routes/watch.routes.js";
import categoryRouter from "./routes/category.routes.js";
import cartRouter from "./routes/cart.router.js";
import profileRouter from "./routes/profile.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", watchRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/profile", profileRouter); // ✔ FIXED

app.get("/", (req, res) => {
    res.send("API hoạt động bình thường");
});

export default app;
