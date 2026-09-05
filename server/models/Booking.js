import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  serviceId: String, serviceName: String, serviceIcon: String,
  professionalId: String, professionalName: String, professionalAvatar: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: String, date: String, time: String, address: String,
  price: { type: Number, required: true }, status: { type: String, enum: ["pending","confirmed","on_the_way","in_progress","completed","cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending","paid","refunded"], default: "pending" },
}, { timestamps: true });
export default mongoose.model("Booking", bookingSchema);