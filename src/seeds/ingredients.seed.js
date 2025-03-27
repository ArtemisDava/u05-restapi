import mongoose from "mongoose";
import Ingredient from "../models/ingredient.model.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { dirname, join } from "path";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

const ingredientData = [
  {
    id: 1,
    name: "Salt",
    image: "https://example.com/images/salt.jpg",
  },
  {
    id: 2,
    name: "Pepper",
    image: "https://example.com/images/pepper.jpg",
  },
  {
    id: 3,
    name: "Olive",
    image: "https://example.com/images/olive-oil.jpg",
  },
  {
    id: 4,
    name: "Garlic",
    image: "https://example.com/images/garlic.jpg",
  },
  {
    id: 5,
    name: "Onion",
    image: "https://example.com/images/onion.jpg",
  },
  {
    id: 6,
    name: "Tomato",
    image: "https://example.com/images/tomato.jpg",
  },
  {
    id: 7,
    name: "Basil",
    image: "https://example.com/images/basil.jpg",
  },
  {
    id: 8,
    name: "Oregano",
    image: "https://example.com/images/oregano.jpg",
  },
  {
    id: 9,
    name: "Flour",
    image: "https://example.com/images/flour.jpg",
  },
  {
    id: 10,
    name: "Sugar",
    image: "https://example.com/images/sugar.jpg",
  },
  {
    id: 11,
    name: "Egg",
    image: "https://example.com/images/egg.jpg",
  },
  {
    id: 12,
    name: "Milk",
    image: "https://example.com/images/milk.jpg",
  },
  {
    id: 13,
    name: "Butter",
    image: "https://example.com/images/butter.jpg",
  },
  {
    id: 14,
    name: "Chicken",
    image: "https://example.com/images/chicken.jpg",
  },
  {
    id: 15,
    name: "Beef",
    image: "https://example.com/images/beef.jpg",
  },
  {
    id: 16,
    name: "Rice",
    image: "https://example.com/images/rice.jpg",
  },
  {
    id: 17,
    name: "Pasta",
    image: "https://example.com/images/pasta.jpg",
  },
  {
    id: 18,
    name: "Cheese",
    image: "https://example.com/images/cheese.jpg",
  },
];

const seedIngredients = async () => {
  try {
    // Clear existing ingredients
    await Ingredient.deleteMany({});

    // Insert new ingredients
    const ingredients = await Ingredient.insertMany(ingredientData);

    console.log(`✅ Successfully seeded ${ingredients.length} ingredients`);
    return ingredients;
  } catch (error) {
    console.error("❌ Error seeding ingredients:", error);
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
      await seedIngredients();
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

export default seedIngredients;
