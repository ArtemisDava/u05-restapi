import mongoose from 'mongoose';
import { assignIncrementalId } from './utils/incrementalId';
import { validatePattern, validateUnique, validateIdExists } from './utils/validators';
import { ingredientQuantitySchema } from './ingredient.model';
import { categoryItemSchema } from './category.model';

const recipeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: {
      type: String,
      required: true,
      validate: [
        validateUnique(
          'Recipe',
          'name',
          'Recipe name must be unique (case-insensitive).'
        ),
        validatePattern(
          /^[A-Z][A-Za-z0-9'-,. ]+$/,
          "Recipe name must start with an uppercase letter and contain only letters, numbers, and the following special characters: - , . '"
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
    category: categoryItemSchema,
    image: { type: String },
  },
  { timestamps: true }
);

assignIncrementalId(recipeSchema);

const recipeItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      ref: 'Recipe',
      validate: {
        async validator(value) {
          return await validateIdExists('Recipe', value);
        },
        message: 'Recipe id does not exist',
      },
    },
  },
  { _id: false }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
export { recipeItemSchema };