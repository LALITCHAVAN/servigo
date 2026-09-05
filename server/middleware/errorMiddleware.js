export const errorHandler = (err, req, res, next) => {
  console.error("API ERROR:", err);
  if (err.name === "ValidationError") return res.status(400).json({ success: false, message: err.message });
  if (err.code === 11000) return res.status(409).json({ success: false, message: "A record with that value already exists" });
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Server error" });
};