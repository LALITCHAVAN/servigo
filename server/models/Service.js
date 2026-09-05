import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true },
  slug: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  category: String, icon: String, image: String, shortDescription: String,
  description: String, startingPrice: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }, reviewCount: { type: Number, default: 0 },
  popular: { type: Boolean, default: false }, bookedCount: { type: Number, default: 0 },
  whatsIncluded: [String], whatsNotIncluded: [String],
  faqs: [{ question: String, answer: String }],
}, { timestamps: true, strict: true });
export default mongoose.model("Service", serviceSchema);