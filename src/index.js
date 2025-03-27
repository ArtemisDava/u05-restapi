import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./database.js"; // Ensure the correct path and file extension

dotenv.config();

const PORT = process.env.PORT || 5001;

let server;

// Connect to the database and start the server
const start = async () => {
  try {
    await connectDB(); // Connect to the database
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}/api/v1/categories`);
    });

    server.on("error", async (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        process.exit(1);
      } else {
        console.error("Server error:", error);
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

// Gracefully shutdown the server
const shutdown = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
