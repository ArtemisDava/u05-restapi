// import express from "express";
// import RecipeController from "../controllers/recipe.controller.js";
// // import isAdminMiddleware from "../middleware/admin.middleware.js";

// const router = express.Router();

// // Protected routes for authenticated admins
// router.put("/v1/admin/recipes/:recipeID", RecipeController.updateRecipe);
// router.delete("/v1/admin/recipes/:recipeID", RecipeController.deleteRecipe);
// router.post("/v1/admin/recipes", RecipeController.createRecipe);

// // Public routes
// router.get("/v1/recipes/:recipeID", RecipeController.getRecipeById);
// router.get("/v1/recipes", RecipeController.getRecipes);

// export default router;

import express from "express";
import RecipeController from "../controllers/recipe.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/recipes:
 *   post:
 *     summary: Create a new recipe
 *     description: Create a new recipe (Admin only)
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */
router.post("/v1/admin/recipes", RecipeController.createRecipe);

/**
 * @swagger
 * /v1/admin/recipes/{recipeID}:
 *   put:
 *     summary: Update a recipe
 *     description: Update an existing recipe (Admin only)
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Recipe not found
 */
router.put("/v1/admin/recipes/:recipeID", RecipeController.updateRecipe);

/**
 * @swagger
 * /v1/admin/recipes/{recipeID}:
 *   delete:
 *     summary: Delete a recipe
 *     description: Delete an existing recipe (Admin only)
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Recipe not found
 */
router.delete("/v1/admin/recipes/:recipeID", RecipeController.deleteRecipe);

/**
 * @swagger
 * /v1/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
router.get("/v1/recipes", RecipeController.getRecipes);

/**
 * @swagger
 * /v1/recipes/{recipeID}:
 *   get:
 *     summary: Get a recipe by ID
 *     description: Retrieve a single recipe by its ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */
router.get("/v1/recipes/:recipeID", RecipeController.getRecipeById);

export default router;
