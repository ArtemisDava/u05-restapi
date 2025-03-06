import mongoose from "mongoose";
import { Recipe } from "../models/recipe.model.js";
import seedIngredients from "./ingredients.seed.js";
import seedCategories from "./categories.seed.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { dirname, join } from "path";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

const recipeData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    ingredients: [
      { id: 17, quantity: 200, unit: "g" }, // Pasta
      { id: 11, quantity: 3, unit: "whole" }, // Eggs
      { id: 18, quantity: 50, unit: "g" }, // Cheese
      { id: 1, quantity: 1, unit: "tsp" }, // Salt
      { id: 2, quantity: 1, unit: "tsp" }, // Pepper
    ],
    instructions: [
      "Boil pasta according to package instructions.",
      "Whisk eggs and cheese in a bowl.",
      "Drain pasta and immediately mix with egg mixture.",
      "Season with salt and pepper.",
    ],
    category: { id: 1 }, // Italian
    image: "https://example.com/images/carbonara.jpg",
  },
  {
    id: 2,
    name: "Chicken Curry",
    ingredients: [
      { id: 14, quantity: 500, unit: "g" }, // Chicken
      { id: 5, quantity: 1, unit: "whole" }, // Onion
      { id: 4, quantity: 3, unit: "cloves" }, // Garlic
      { id: 1, quantity: 1, unit: "tsp" }, // Salt
      { id: 2, quantity: 1, unit: "tsp" }, // Pepper
    ],
    instructions: [
      "Saute onion and garlic until fragrant.",
      "Add chicken and cook until browned.",
      "Add spices and simmer for 20 minutes.",
      "Season with salt and pepper to taste.",
    ],
    category: { id: 3 }, // Indian
    image: "https://example.com/images/curry.jpg",
  },
  {
    id: 3,
    name: "Tomato Basil Pasta",
    ingredients: [
      { id: 17, quantity: 200, unit: "g" }, // Pasta
      { id: 6, quantity: 4, unit: "whole" }, // Tomato
      { id: 7, quantity: 10, unit: "leaves" }, // Basil
      { id: 4, quantity: 2, unit: "cloves" }, // Garlic
      { id: 3, quantity: 2, unit: "tbsp" }, // Olive oil
      { id: 1, quantity: 1, unit: "tsp" }, // Salt
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "Saute garlic in olive oil.",
      "Add chopped tomatoes and cook until soft.",
      "Toss in cooked pasta and torn basil leaves.",
      "Season with salt.",
    ],
    category: { id: 1 }, // Italian
    image: "https://example.com/images/tomato-basil-pasta.jpg",
  },
];

const seedRecipes = async () => {
  try {
    // Clear existing recipes
    await Recipe.deleteMany({});

    // Insert new recipes
    const recipes = await Recipe.insertMany(recipeData);

    console.log(`✅ Successfully seeded ${recipes.length} recipes`);
    return recipes;
  } catch (error) {
    console.error("❌ Error seeding recipes:", error);
    throw error;
  }
};

// Run the seed function if this file is executed directly
// In ES modules, we check if the current file URL matches the executed file
const isDirectlyExecuted = process.argv[1] === __filename;

if (isDirectlyExecuted) {
  await seedCategories();
  await seedIngredients();

  // Connect to the database
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log("📊 Connected to MongoDB");
      await seedRecipes();
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

export default seedRecipes;
