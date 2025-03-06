import mongoose from "mongoose";
import {
  ingredientItemSchema,
  ingredientQuantitySchema,
} from "./ingredient.model";
import { recipeItemSchema } from "./recipe.model";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    apiKey: { type: String, required: true, unique: true }, // TO-DO
    cart: [ingredientQuantitySchema],
    favoriteRecipes: [recipeItemSchema],
    allergies: [ingredientItemSchema],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
