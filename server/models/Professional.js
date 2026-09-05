import mongoose from "mongoose";
const professionalSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true }, name: { type: String, required: true },
  profession: String, avatar: String, rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }, experience: Number, completedJobs: Number,
  location: String, startingPrice: Number, verified: Boolean, online: Boolean, bio: String,
  skills: [String], services: [{ name: String, price: Number, duration: String }],
  availability: [{ day: String, hours: String, off: Boolean }],
  portfolio: [{ image: String, title: String }],
}, { timestamps: true });
export default mongoose.model("Professional", professionalSchema);