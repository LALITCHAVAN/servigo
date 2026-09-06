import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI (or MONGO_URI) is not configured.");
    }

    const connection = await mongoose.connect(mongoUri);

    console.log(
      `🍃 MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      `❌ MongoDB Connection Error: ${error.message}`
    );

    process.exit(1);
  }
};

export default connectDB;