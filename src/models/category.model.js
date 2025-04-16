import mongoose from "mongoose";
import { assignIncrementalId } from "./utils/incrementalId.js";
import {
  validateUnique,
  validateIfExists,
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
          "Category name exists already, it must be unique."
        ),
      ],
    },
    image: { type: String },
    description: {
      type: String,
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
          return await validateIfExists("Category", value);
        },
        message: "Category name does not exist",
      },
    },
  },
  { _id: true }
);

export default mongoose.model("Category", categorySchema);
export { categoryItemSchema };
