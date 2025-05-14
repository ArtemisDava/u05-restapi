import Recipe from "../models/recipe.model.js";
import {
  checkIfExists,
  parseId,
  convertToCapitalizedLetters,
  sanitizeName,
  sanitizeDescription,
  convertToCapitalizedLetter,
} from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

const fields = [
  "id",
  "name",
  "ingredients",
  "alternatives",
  "instructions",
  "category",
  "image",
];

const RecipeController = {
  getRecipes: async (_, res) => {
    try {
      let recipes = await Recipe.find({})
        .populate("ingredients.ingredient", "name")
        .sort({ name: 1 });

      recipes = filterFields(recipes, fields);

      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes,
      });
    } catch (error) {
      errorHandler(res, 500, "Error fetching recipes");
    }
  },

  getRecipeById: async (req, res) => {
    let recipeId = req.params.recipeID;
    try {
      recipeId = parseId(recipeId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      let recipe = await Recipe.findOne({ id: recipeId }).populate(
        "ingredients.ingredient",
        "name"
      );
      if (!recipe) {
        return errorHandler(res, 404, `Recipe: '${recipeId}' not found`);
      }

      recipe = filterFields(recipe, fields);

      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      return errorHandler(res, 500, `Fetching recipe '${recipeId}'`);
    }
  },

  createRecipe: async (req, res) => {
    try {
      const { name, ingredients, alternatives, instructions, category, image } =
        req.body;

      if (!name || !instructions || !category || !ingredients || !image)
        return errorHandler(
          res,
          400,
          "Name, ingredients, instructions, image and category are required"
        );

      if (!Array.isArray(ingredients) || ingredients.length === 0)
        return errorHandler(
          res,
          400,
          "Ingredients must be an array and cannot be empty"
        );

      const nameValidation = sanitizeName(name, "Recipe name");
      if (nameValidation.message)
        return errorHandler(res, 400, nameValidation.message);

      const transformedName = convertToCapitalizedLetters(name);

      let exists = await checkIfExists(Recipe, { name: transformedName });
      if (exists)
        return errorHandler(
          res,
          400,
          `Recipe '${transformedName}' already exists`
        );

      // Create new recipe
      const recipe = new Recipe({
        name: transformedName,
        ingredients,
        alternatives: alternatives || [],
        instructions: instructions,
        category,
        image,
      });

      try {
        await recipe.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

      res.status(201).json({ success: true, data: recipe });
    } catch (error) {
      console.error(error);
      return errorHandler(res, 500, "creating recipe");
    }
  },

  updateRecipe: async (req, res) => {
    let recipeId = req.params.recipeID;
    try {
      recipeId = parseId(recipeId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const { name, ingredients, alternatives, instructions, category, image } =
        req.body;

      const recipe = await Recipe.findOne({ id: recipeId });
      if (!recipe) {
        errorHandler(res, 404, `Recipe: '${recipeId}' not found`);
        return;
      }

      if (name !== undefined) {
        const nameValidation = sanitizeName(name, "Recipe name");
        if (nameValidation.message) {
          return errorHandler(res, 400, nameValidation.message);
        }

        // Process name to be capitalized
        const transformedName = convertToCapitalizedLetters(
          nameValidation.sanitized
        );

        try {
          const exists = await checkIfExists(Recipe, {
            name: transformedName,
            id: { $ne: recipeId },
          });
          if (exists) {
            return errorHandler(
              res,
              400,
              `Recipe '${transformedName}' matches an existing recipe name!`
            );
          }

          recipe.name = transformedName;
        } catch (error) {
          return errorHandler(res, 500, error.message);
        }
      }

      if (ingredients !== undefined) {
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
          return errorHandler(
            res,
            400,
            "Ingredients must be an array and cannot be empty"
          );
        }
        recipe.ingredients = ingredients ?? recipe.ingredients;
      }

      if (alternatives !== undefined) {
        if (!Array.isArray(alternatives)) {
          return errorHandler(res, 400, "Alternatives must be an array");
        }
        recipe.alternatives = alternatives ?? recipe.alternatives;
      }

      if (instructions !== undefined) {
        if (!Array.isArray(instructions)) {
          return errorHandler(res, 400, "Instructions must be an array");
        }
        recipe.instructions = instructions ?? recipe.instructions;
      }

      if (category !== undefined) {
        recipe.category = category ?? recipe.category;
      }

      if (image !== undefined) {
        recipe.image = image ?? recipe.image;
      }

      try {
        await recipe.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      return errorHandler(res, 500, `Updating recipe '${recipeId}'`);
    }
  },

  deleteRecipe: async (req, res) => {
    let recipeId = req.params.recipeID;
    try {
      recipeId = parseId(recipeId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const recipe = await Recipe.findOne({ id: recipeId });
      if (!recipe) {
        errorHandler(res, 404, `Recipe: '${recipeId}' not found`);
        return;
      }

      const deleteCount = (await recipe.deleteOne({ _id: recipeId._id }))
        .deletedCount;

      res.status(200).json({
        success: true,
        count: deleteCount,
      });
    } catch (error) {
      errorHandler(res, 500, `Deleting recipe '${recipeId}'`);
    }
  },
};

export default RecipeController;
