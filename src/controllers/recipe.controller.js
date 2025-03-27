import Category from "../models/category.model.js";
import Recipe from "../models/recipe.model.js";
import Ingredient from "../models/ingredient.model.js";
import { checkIfExists, parseId } from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

// TO-DO: sanitize inputs

const fields = [
  "id",
  "name",
  "ingredients",
  "alternatives",
  "instructions",
  "category",
];

const RecipeController = {
  getRecipes: async (_, res) => {
    try {
      let recipes = await Recipe.find({}).sort({ name: 1 });

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
      let recipe = await Recipe.findOne({ id: recipeId });
      if (!recipe) {
        errorHandler(res, 404, `Recipe: '${recipeId}' not found`);
        return;
      }

      recipe = filterFields(recipe, fields);

      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      errorHandler(res, 500, `Fetching recipe '${recipeId}'`);
    }
  },

  createRecipe: async (req, res) => {
    try {
      const { name, ingredients, alternatives, instructions, category } =
        req.body;

      if (!name || !instructions || !category || !ingredients) {
        errorHandler(
          res,
          400,
          "Name, ingredients, instructions, and category are required"
        );
        return;
      }

      let exists = await checkIfExists(Recipe, { name });
      if (exists) {
        errorHandler(res, 400, `Recipe '${name}' already exists`);
        return;
      }

      // Create new recipe
      const recipe = new Recipe({
        name,
        ingredients,
        alternatives,
        instructions,
        category,
      });

      await recipe.save();

      res.status(201).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      //To-do: decide an error message for all controllers
      errorHandler(res, 500, "creating recipe");
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
      const { name, ingredients, alternatives, instructions, category } =
        req.body;

      const recipe = await Recipe.findOne({ id: recipeId });
      if (!recipe) {
        errorHandler(res, 404, `Recipe: '${recipeId}' not found`);
        return;
      }

      if (name) {
        let exists = await checkIfExists(Recipe, { name });
        if (exists) {
          errorHandler(
            res,
            400,
            `Recipe '${name}' matches an existing recipe name!`
          );
          return;
        }

        recipe.name = name;
      }
      recipe.ingredients = ingredients ?? recipe.ingredients;
      recipe.alternatives = alternatives ?? recipe.alternatives;
      recipe.instructions = instructions ?? recipe.instructions;
      recipe.category = category ?? recipe.category;

      // check if i need a try catch here.
      await recipe.save();

      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      errorHandler(res, 500, `Updating recipe '${recipeId}'`);
    }
  },
  deleteRecipe: async (req, res) => {
    let recipeId = req.params.recipeID;
    try {
      recipeId = parseId(recipeId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    // const recipeId = parseId(req, res, "recipeID");
    // if (recipeId === null) return;

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
