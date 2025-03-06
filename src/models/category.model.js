import mongoose from "mongoose";
import { assignIncrementalId } from "./utils/incrementalId.js";
import {
  validatePattern,
  validateUnique,
  validateIdExists,
} from "./utils/validators.js";

const categorySchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validateUnique(
          "Category",
          "name",
          "Category name must be unique (case-insensitive)."
        ),
        validatePattern(
          /^[A-Z][a-z]+$/,
          "Category name must start with an uppercase letter and contain only letters."
        ),
      ],
    },
    image: { type: String },
    description: {
      type: String,
      validate: validatePattern(
        /^[a-zA-Z0-9'-., ]+$/,
        "Description must contain only letters, numbers, and the following special characters: - . , '"
      ),
    },
  },
  { timestamps: true }
);

assignIncrementalId(categorySchema);

const categoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      ref: "Category",
      validate: {
        async validator(value) {
          return await validateIdExists("Category", value);
        },
        message: "Category name does not exist",
      },
    },
  },
  { _id: true }
);

export default mongoose.model("Category", categorySchema);
export { categoryItemSchema };
