import mongoose from "mongoose";
import { assignIncrementalId } from "./utils/incrementalId.js";
import { validatePattern, validateUnique } from "./utils/validators.js";

const ingredientQuantitySchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
    quantity: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      enum: [
        "",
        "tsp",
        "tbsp",
        "cups",
        "ml",
        "L",
        "fl oz",
        "pt",
        "qt",
        "gal",
        "g",
        "kg",
        "oz",
        "lb",
        "ea",
        "pcs",
        "in",
        "cm",
        "min",
        "hr",
        "°C",
        "°F",
      ],
      required: false,
    },
  },
  { _id: false }
);
const ingredientSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validateUnique(
          "Ingredient",
          "name",
          "Ingredient name must be unique (case-insensitive)."
        ),
      ],
    },
    image: {
      type: String,
      validate: validatePattern(
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
        "Image URL must be a valid URL 'https://' and end with one of the following extensions: png, jpg, jpeg, gif, svg"
      ),
    },
  },
  { timestamps: true }
);

assignIncrementalId(ingredientSchema);

export default mongoose.model("Ingredient", ingredientSchema);
export { ingredientQuantitySchema };
