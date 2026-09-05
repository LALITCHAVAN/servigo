import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["booking","review","payment","system","message"], default: "system" },
  title: String, message: String, read: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("Notification", notificationSchema);
