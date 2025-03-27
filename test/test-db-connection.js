import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log(`Found .env file at ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.error(`No .env file found at ${envPath}`);
  process.exit(1);
}

const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

console.log(
  `Testing connection to: ${connectionString?.replace(
    /\/\/([^:]+):([^@]+)@/,
    "//***:***@"
  )}`
);

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Connection closed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
