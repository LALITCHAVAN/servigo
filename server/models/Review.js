import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  author: String, avatar: String, rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true }, serviceUsed: String, professionalName: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceId: String, professionalId: String,
}, { timestamps: true });
export default mongoose.model("Review", reviewSchema);