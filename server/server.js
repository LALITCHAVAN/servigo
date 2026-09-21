import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

// ==========================================
// LOAD ENVIRONMENT VARIABLES FIRST
// ==========================================

dotenv.config();

// ==========================================
// ROUTES
// ==========================================

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ==========================================
// MIDDLEWARE
// ==========================================

import { errorHandler } from "./middleware/errorMiddleware.js";

// ==========================================
// SOCKET.IO
// ==========================================

import { registerLocationSocket } from "./socket/locationSocket.js";

// ==========================================
// DEBUG ENVIRONMENT
// ==========================================

console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP PASS EXISTS:", !!process.env.SMTP_PASS);

// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

// Create HTTP server
// Socket.IO will use this server
const httpServer = createServer(app);

// ==========================================
// CORS CONFIGURATION
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://servigo-eight.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("Allowed CORS Origins:", allowedOrigins);

// ==========================================
// EXPRESS CORS
// ==========================================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // Example: Postman / server-to-server requests
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
// SOCKET.IO SERVER
// ==========================================

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Register live-location socket events
registerLocationSocket(io);

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

// ==========================================
// CHECK MONGODB URI
// ==========================================

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not configured");
  process.exit(1);
}

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected successfully");

    // Start HTTP + Socket.IO server
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔌 Socket.IO ready on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Error:",
      error.message
    );

    process.exit(1);
  }
};

// ==========================================
// START APPLICATION
// ==========================================

startServer();

// ==========================================
// EXPORT APP
// ==========================================

export default app;