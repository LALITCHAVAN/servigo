import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ==========================================
// DATABASE CONNECTION
// ==========================================

// ==========================================
// ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ServiGo API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/professionals", professionalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use(errorHandler);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not configured. Set it in server/.env.");
  process.exitCode = 1;
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`)))
    .catch((error) => { console.error("❌ MongoDB Connection Error:", error.message); process.exitCode = 1; });
}

export default app;