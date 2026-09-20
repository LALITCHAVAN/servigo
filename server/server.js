import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

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

console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP PASS EXISTS:", !!process.env.SMTP_PASS);

const app = express();

// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://servigo-eight.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("Allowed CORS Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

// ==========================================
// HEALTH ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ServiGo API is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/professionals", professionalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use(errorHandler);

// ==========================================
// DATABASE + SERVER
// ==========================================

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not configured");
  process.exit(1);
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Error:",
      error.message
    );

    process.exit(1);
  }
};

startServer();

export default app;