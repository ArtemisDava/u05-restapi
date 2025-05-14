import Ingredient from "../models/ingredient.model.js";
import Recipe from "../models/recipe.model.js";
import {
  checkIfExists,
  parseId,
  convertToCapitalizedLetters,
  sanitizeName,
} from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

const fields = ["id", "name", "image", "_id"];

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
      const { name, image } = req.body;

      // Validate required name field
      if (!name) return errorHandler(res, 400, "Name is required");

      // Sanitize name
      const nameValidation = sanitizeName(name, "Name");
      if (nameValidation.message)
        return errorHandler(res, 400, nameValidation.message);

      // Process name to be capitalized
      const transformedName = convertToCapitalizedLetters(name);

      // Check if ingredient name already exists
      let exists = await checkIfExists(Ingredient, { name: transformedName });
      if (exists)
        return errorHandler(
          res,
          400,
          `Ingredient '${transformedName}' already exists`
        );

      // Create new ingredient
      const ingredient = new Ingredient({
        name: transformedName,
        image: image || undefined,
      });
      try {
        await ingredient.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

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
      if (!ingredient)
        return errorHandler(
          res,
          404,
          `Ingredient: '${ingredientId}' not found`
        );

      if (name !== undefined) {
        const nameValidation = sanitizeName(name, "Name");
        if (nameValidation.message) {
          return errorHandler(res, 400, nameValidation.message);
        }
        // Process name to be capitalized
        const transformedName = convertToCapitalizedLetters(name);

        // Check if ingredient name already exists
        try {
          let exists = await checkIfExists(Ingredient, {
            name: transformedName,
            id: { $ne: ingredientId },
          });
          if (exists) {
            return errorHandler(
              res,
              400,
              `Ingredient '${name}' matches an existing ingredient name!`
            );
          }
          ingredient.name = transformedName;
        } catch (error) {
          return errorHandler(res, 500, error.message);
        }
      }

      if (image !== undefined) {
        ingredient.image = image ?? ingredient.image;
      }
      try {
        await ingredient.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

      res.status(200).json({ success: true, data: ingredient });
    } catch (error) {
      //read more about this catch block
      return errorHandler(
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
        return errorHandler(
          res,
          404,
          `Ingredient: '${ingredientId}' not found`
        );
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
