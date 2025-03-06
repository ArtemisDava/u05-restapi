import mongoose from "mongoose";
import seedCategories from "./categories.seed.js";
import seedIngredients from "./ingredients.seed.js";
import seedRecipes from "./recipes.seed.js";

const seedAll = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed in sequence to ensure dependencies are met
    await seedCategories();
    await seedIngredients();
    await seedRecipes();

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

// Connect to the database and run all seeds
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("📊 Connected to MongoDB");
    await seedAll();
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
