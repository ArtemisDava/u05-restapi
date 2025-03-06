import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server"; // Optional for testing

dotenv.config();

let mongoMemoryServer;

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    let connectionString = process.env.MONGO_URI;

    // For development/testing, use in-memory MongoDB if no URI provided
    if (!connectionString) {
      console.log(
        "No MongoDB URI found, using in-memory MongoDB for development"
      );
      mongoMemoryServer = await MongoMemoryServer.create();
      connectionString = mongoMemoryServer.getUri();
    }

    const conn = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Test the connection
    try {
      await mongoose.connection.db.admin().ping();
      console.log("Database connection confirmed with successful ping");
    } catch (pingError) {
      console.warn(
        "Could not ping database, but connection was established:",
        pingError
      );
    }

    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error("Connection details:", {
      uri: process.env.MONGO_URI ? "[REDACTED]" : "Not provided",
      mongooseVersion: mongoose.version,
    });

    if (error.name === "MongoTimeoutError") {
      console.error(
        "Connection timed out. Please check your network connection and MongoDB Atlas access settings."
      );
    }

    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");

    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
      console.log("MongoDB Memory Server stopped");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};
