import Ingredient from "../models/ingredient.model.js";
import Recipe from "../models/recipe.model.js";
import { checkIfExists, parseId } from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

// TO-DO: sanitize inputs
// TO-DO: add validation for image URL
// TO-DO: encapsulate the logic for checking if an ingredient is used in a recipe
// TO-DO: add a function to delete an ingredient
// TO-DO: When im done with all CRUD operations:
// 1.  Look over and see if I can refactor redundant code
// 2.  Look over error handling (Maybe a switch statement)
// 4.  Look over the code and add comments to explain what each function does
// 5.  FINALLY, look over the code and see if Error handeling is done correctly
// 6.  LAST, any last refactor?

const fields = ["id", "name", "image"];

const ingredientController = {
  getIngredients: async (_, res) => {
    try {
      let ingredients = await Ingredient.find({}).sort({ name: 1 });

      ingredients = filterFields(ingredients, fields);

      res.status(200).json({
        success: true,
        count: ingredients.length,
        data: ingredients,
      });
    } catch (error) {
      errorHandler(res, 500, "Error fetching ingredients");
    }
  },

  getIngredientById: async (req, res) => {
    let ingredientId = req.params.ingredientID;

    try {
      ingredientId = parseId(ingredientId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      let ingredient = await Ingredient.findOne({ id: ingredientId });
      if (!ingredient) {
        errorHandler(res, 404, `Ingredient: '${ingredientId}' not found`);
        return;
      }

      ingredient = filterFields(ingredient, fields);

      res.status(200).json({
        success: true,
        data: ingredient,
      });
    } catch (error) {
      errorHandler(res, 500, `Fetching ingredient '${ingredientId}'`);
    }
  },

  createIngredient: async (req, res) => {
    try {
      const { _id, name, image } = req.body;

      if (!name) {
        errorHandler(res, 400, "Name is required");
        return;
      }

      // Check if name already exists
      let exists = await checkIfExists(Ingredient, { name });
      if (exists) {
        errorHandler(res, 400, `Ingredient '${name}' already exists`);
        return;
      }

      // Create new ingredient
      const ingredient = new Ingredient({
        name,
        image,
        _id: _id ?? undefined,
      });

      await ingredient.save();

      res.status(201).json({ success: true, data: ingredient });
    } catch (error) {
      errorHandler(res, 500, error.message);
    }
  },

  updateIngredient: async (req, res) => {
    let ingredientId = req.params.ingredientID;
    try {
      ingredientId = parseId(ingredientId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const { name, image } = req.body;
      let ingredient = await Ingredient.findOne({ id: ingredientId });
      if (!ingredient) {
        errorHandler(res, 404, `Ingredient: '${ingredientId}' not found`);
        return;
      }

      if (name) {
        let exists = await checkIfExists(Ingredient, { name });
        if (exists) {
          errorHandler(res, 400, `Ingredient '${name}' already exists`);
          return;
        }
        ingredient.name = name;
      }

      ingredient.image = image ?? ingredient.image;

      await ingredient.save();

      res.status(200).json({ success: true, data: ingredient });
    } catch (error) {
      //read more about this catch block
      errorHandler(
        res,
        500,
        error.message || `Updating ingredient '${ingredientId}'`
      );
    }
  },

  // Create a function of this once all Controllers are working
  deleteIngredient: async (req, res) => {
    let ingredientId = req.params.ingredientID;
    try {
      ingredientId = parseId(ingredientId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const ingredient = await Ingredient.findOne({ id: ingredientId });
      if (!ingredient) {
        errorHandler(res, 404, `Ingredient: '${ingredientId}' not found`);
        return;
      }
      const recipeUsingIngredient = await Recipe.countDocuments({
        "ingredients.ingredient": ingredient._id,
      });

      if (recipeUsingIngredient > 0) {
        errorHandler(
          res,
          400,
          `Ingredient id: '${ingredientId}', name: '${ingredient.name}' is used in ${recipeUsingIngredient} recipes. Remove the ingredient from the recipes before deleting.`
        );
        return;
      }

      const deletedCount = (await Ingredient.deleteOne({ _id: ingredient._id }))
        .deletedCount;
      res.status(200).json({ success: true, count: deletedCount });
    } catch (error) {
      errorHandler(res, 500, `Deleting ingredient '${ingredientId}'`);
    }
  },
};

export default ingredientController;
