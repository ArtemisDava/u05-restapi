import mongoose from "mongoose";
import { assignIncrementalId } from "./utils/incrementalId.js";
import { validatePattern, validateUnique } from "./utils/validators.js";
import { ingredientQuantitySchema } from "./ingredient.model.js";

const recipeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validateUnique(
          "Recipe",
          "name",
          "Recipe name must be unique (case-insensitive)."
        ),
      ],
    },
    ingredients: [ingredientQuantitySchema],
    alternatives: [ingredientQuantitySchema],
    instructions: [
      {
        type: String,
        required: true,
        validate: validatePattern(
          /^[a-zA-Z0-9'-., ]+$/,
          "Instructions must contain only letters, numbers, and the following special characters: - . , '"
        ),
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

assignIncrementalId(recipeSchema);

export default mongoose.model("Recipe", recipeSchema);
