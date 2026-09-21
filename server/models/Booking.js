import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceId: String,
    serviceName: String,
    serviceIcon: String,

    professionalId: String,
    professionalName: String,
    professionalAvatar: String,

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: String,

    date: String,
    time: String,
    address: String,

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "on_the_way",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },

    // ==========================================
    // LIVE CUSTOMER LOCATION
    // ==========================================

    liveLocation: {
      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },

      accuracy: {
        type: Number,
        default: null,
      },

      sharing: {
        type: Boolean,
        default: false,
      },

      lastUpdated: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);