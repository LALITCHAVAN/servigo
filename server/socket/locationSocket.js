import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const bookingRoom = (bookingId) => `booking:${bookingId}`;

const isCustomerForBooking = (user, booking) => {
  return (
    user.role === "customer" &&
    String(booking.customerId) === String(user._id)
  );
};

const isProfessionalForBooking = (user, booking) => {
  return (
    user.role === "professional" &&
    String(booking.professionalId) === String(user._id)
  );
};

export const registerLocationSocket = (io) => {
  // ==========================================
  // SOCKET JWT AUTHENTICATION
  // ==========================================

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id).select(
        "-password"
      );

      if (!user) {
        return next(new Error("User no longer exists"));
      }

      socket.user = user;

      next();
    } catch (error) {
      console.error(
        "SOCKET AUTH ERROR:",
        error.message
      );

      next(new Error("Invalid or expired token"));
    }
  });

  // ==========================================
  // SOCKET CONNECTION
  // ==========================================

  io.on("connection", (socket) => {
    console.log(
      `🔌 Socket connected: ${socket.user.name} (${socket.user.role})`
    );

    // ==========================================
    // JOIN BOOKING ROOM
    // ==========================================

    socket.on("booking:join", async (bookingId) => {
      try {
        if (!bookingId) {
          socket.emit("location:error", {
            message: "Booking ID is required",
          });

          return;
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
          socket.emit("location:error", {
            message: "Booking not found",
          });

          return;
        }

        const user = socket.user;

        const customerAllowed =
          isCustomerForBooking(user, booking);

        const professionalAllowed =
          isProfessionalForBooking(user, booking);

        if (!customerAllowed && !professionalAllowed) {
          socket.emit("location:error", {
            message: "You are not allowed to access this booking",
          });

          return;
        }

        const room = bookingRoom(bookingId);

        await socket.join(room);

        console.log(
          `📍 ${user.name} joined ${room}`
        );

        socket.emit("booking:joined", {
          bookingId: String(booking._id),
          role: user.role,
        });

        // ==========================================
        // SEND LAST KNOWN LOCATION
        // ==========================================

        if (
          booking.liveLocation?.sharing &&
          booking.liveLocation?.latitude !== null &&
          booking.liveLocation?.longitude !== null
        ) {
          socket.emit("location:updated", {
            bookingId: String(booking._id),
            latitude: booking.liveLocation.latitude,
            longitude: booking.liveLocation.longitude,
            accuracy: booking.liveLocation.accuracy,
            lastUpdated: booking.liveLocation.lastUpdated,
          });
        }
      } catch (error) {
        console.error(
          "BOOKING JOIN ERROR:",
          error.message
        );

        socket.emit("location:error", {
          message: "Unable to join booking",
        });
      }
    });

    // ==========================================
    // CUSTOMER LOCATION UPDATE
    // ==========================================

    socket.on(
      "location:update",
      async ({
        bookingId,
        latitude,
        longitude,
        accuracy,
      }) => {
        try {
          const user = socket.user;

          if (user.role !== "customer") {
            socket.emit("location:error", {
              message:
                "Only the customer can share live location",
            });

            return;
          }

          if (!bookingId) {
            socket.emit("location:error", {
              message: "Booking ID is required",
            });

            return;
          }

          const lat = Number(latitude);
          const lng = Number(longitude);
          const acc = Number(accuracy);

          if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng)
          ) {
            socket.emit("location:error", {
              message: "Invalid location coordinates",
            });

            return;
          }

          if (
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
          ) {
            socket.emit("location:error", {
              message: "Invalid GPS coordinates",
            });

            return;
          }

          const booking = await Booking.findById(
            bookingId
          );

          if (!booking) {
            socket.emit("location:error", {
              message: "Booking not found",
            });

            return;
          }

          // ==========================================
          // IMPORTANT SECURITY CHECK
          // ==========================================

          if (
            String(booking.customerId) !==
            String(user._id)
          ) {
            socket.emit("location:error", {
              message:
                "You are not the customer of this booking",
            });

            return;
          }

          const room = bookingRoom(bookingId);

          // ==========================================
          // SAVE LAST LOCATION
          // ==========================================

          booking.liveLocation = {
            latitude: lat,
            longitude: lng,
            accuracy: Number.isFinite(acc) ? acc : null,
            sharing: true,
            lastUpdated: new Date(),
          };

          await booking.save();

          // ==========================================
          // SEND TO PROFESSIONAL
          // ==========================================

          socket.to(room).emit("location:updated", {
            bookingId: String(booking._id),
            latitude: lat,
            longitude: lng,
            accuracy: Number.isFinite(acc) ? acc : null,
            lastUpdated:
              booking.liveLocation.lastUpdated,
          });

          console.log(
            `📍 Location updated for booking ${bookingId}`
          );
        } catch (error) {
          console.error(
            "LOCATION UPDATE ERROR:",
            error.message
          );

          socket.emit("location:error", {
            message: "Unable to update location",
          });
        }
      }
    );

    // ==========================================
    // CUSTOMER STOPS SHARING
    // ==========================================

    socket.on(
      "location:stop",
      async ({ bookingId }) => {
        try {
          const user = socket.user;

          if (user.role !== "customer") {
            return;
          }

          const booking = await Booking.findById(
            bookingId
          );

          if (!booking) {
            return;
          }

          if (
            String(booking.customerId) !==
            String(user._id)
          ) {
            return;
          }

          booking.liveLocation.sharing = false;
          booking.liveLocation.lastUpdated =
            new Date();

          await booking.save();

          const room = bookingRoom(bookingId);

          socket.to(room).emit(
            "location:stopped",
            {
              bookingId: String(booking._id),
            }
          );

          console.log(
            `🛑 Location sharing stopped for booking ${bookingId}`
          );
        } catch (error) {
          console.error(
            "LOCATION STOP ERROR:",
            error.message
          );
        }
      }
    );

    // ==========================================
    // DISCONNECT
    // ==========================================

    socket.on("disconnect", (reason) => {
      console.log(
        `🔌 Socket disconnected: ${socket.user.name} - ${reason}`
      );
    });
  });
};