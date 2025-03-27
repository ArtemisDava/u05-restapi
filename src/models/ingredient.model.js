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
        validatePattern(
          /^[A-Z][a-z]+$/,
          "Ingredient name must start with an uppercase letter and contain only letters."
        ),
      ],
    },
    image: {
      type: String,
      validate: validatePattern(
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
        "Image URL must be a valid URL and end with one of the following extensions: png, jpg, jpeg, gif, svg"
      ),
    },
  },
  { timestamps: true }
);

assignIncrementalId(ingredientSchema);

// const ingredientItemSchema = new mongoose.Schema(
//   {
//     id: {
//       type: Number,
//       validate: {
//         validator: async function (value) {
//           return await validateIfExists("Ingredient", value);
//         },
//         message: "Ingredient id does not exist",
//       },
//     },
//   },
//   { _id: false }
// );

export default mongoose.model("Ingredient", ingredientSchema);
export { ingredientQuantitySchema };
