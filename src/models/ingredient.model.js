import mongoose from "mongoose";
import { assignIncrementalId } from "./utils/incrementalId";
import { validatePattern, validateUnique, validateIdExists } from "./utils/validators";

const ingredientSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
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
        validatePattern(
          /^[A-Z][a-z]+$/,
          "Ingredient name must start with an uppercase letter and contain only letters."
        ),
      ],
    },
    image: { type: String },
  },
  { timestamps: true }
);

assignIncrementalId(ingredientSchema);

const ingredientQuantitySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      ref: "Ingredient",
      validate: {
        validator: async function (value) {
          return await validateIdExists("Ingredient", value);
        },
        message: "Ingredient id does not exist",
      },
    },
    quantity: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      validate: validatePattern(
        /^[a-zA-Z]+$/,
        "Unit must contain only letters."
      ),
    },
  },
  { _id: false }
);

const ingredientItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      validate: {
        validator: async function (value) {
          return await validateIdExists("Ingredient", value);
        },
        message: "Ingredient id does not exist",
      },
    },
  },
  { _id: false }
);

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export { ingredientQuantitySchema, ingredientItemSchema };



