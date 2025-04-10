import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

export const connectDB = async () => {
  // let MONGO_URI = process.env.MONGO_URI;
  console.log("MONGO_URI:", process.env.MONGO_URI);
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Check your environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("📊 Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};
