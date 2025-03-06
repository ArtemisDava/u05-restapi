import mongoose from "mongoose";
import Category from "../models/category.model.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { dirname, join } from "path";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

const categoryData = [
  {
    id: 1,
    name: "Italian",
    description:
      "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors.",
    image: "https://example.com/images/italian.jpg",
  },
  {
    id: 2,
    name: "Mexican",
    description:
      "Bold and spicy Mexican dishes with corn, beans, and chili peppers.",
    image: "https://example.com/images/mexican.jpg",
  },
  {
    id: 3,
    name: "Indian",
    description:
      "Aromatic Indian cuisine with diverse spices, curries, and flatbreads.",
    image: "https://example.com/images/indian.jpg",
  },
  {
    id: 4,
    name: "Chinese",
    description:
      "Traditional Chinese recipes featuring stir-fry techniques and balanced flavors.",
    image: "https://example.com/images/chinese.jpg",
  },
  {
    id: 5,
    name: "Japanese",
    description:
      "Elegant Japanese cuisine emphasizing fresh ingredients and precise preparation.",
    image: "https://example.com/images/japanese.jpg",
  },
  {
    id: 6,
    name: "Thai",
    description:
      "Vibrant Thai food balancing sweet, sour, salty, and spicy flavors.",
    image: "https://example.com/images/thai.jpg",
  },
  {
    id: 7,
    name: "Mediterranean",
    description:
      "Healthy Mediterranean diet with olive oil, fresh vegetables, and lean proteins.",
    image: "https://example.com/images/mediterranean.jpg",
  },
  {
    id: 8,
    name: "French",
    description:
      "Sophisticated French cuisine known for rich sauces and classic techniques.",
    image: "https://example.com/images/french.jpg",
  },
];

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    // Insert new categories
    const categories = await Category.insertMany(categoryData);

    console.log(`✅ Successfully seeded ${categories.length} categories`);
    return categories;
  } catch (error) {
    console.error(" Error seeding categories:", error);
    throw error;
  }
};

// Run the seed function if this file is executed directly
// In ES modules, we check if the current file URL matches the executed file
const isDirectlyExecuted = process.argv[1] === __filename;

if (isDirectlyExecuted) {
  // Connect to the database
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log("📊 Connected to MongoDB");
      await seedCategories();
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

export default seedCategories;
