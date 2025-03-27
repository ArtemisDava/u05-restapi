// import express from "express";
// import ingredientController from "../controllers/ingredient.controller.js";
// // import isAdminMiddleware from "../middleware/admin.middleware.js";

// const router = express.Router();

// // Protected routes for authenticated admins
// router.put(
//   "/v1/admin/ingredients/:ingredientID",
//   ingredientController.updateIngredient
// );
// router.delete(
//   "/v1/admin/ingredients/:ingredientID",
//   ingredientController.deleteIngredient
// );
// router.post("/v1/admin/ingredients", ingredientController.createIngredient);

// // Public routes
// router.get(
//   "/v1/ingredients/:ingredientID",
//   ingredientController.getIngredientById
// );
// router.get("/v1/ingredients", ingredientController.getIngredients);

// export default router;

import express from "express";
import ingredientController from "../controllers/ingredient.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     description: Create a new ingredient (Admin only)
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 */
router.post("/v1/admin/ingredients", ingredientController.createIngredient);

/**
 * @swagger
 * /v1/admin/ingredients/{ingredientID}:
 *   put:
 *     summary: Update an ingredient
 *     description: Update an existing ingredient (Admin only)
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Ingredient not found
 */
router.put(
  "/v1/admin/ingredients/:ingredientID",
  ingredientController.updateIngredient
);

/**
 * @swagger
 * /v1/admin/ingredients/{ingredientID}:
 *   delete:
 *     summary: Delete an ingredient
 *     description: Delete an existing ingredient (Admin only)
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ingredient deleted successfully
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Ingredient not found
 */
router.delete(
  "/v1/admin/ingredients/:ingredientID",
  ingredientController.deleteIngredient
);

/**
 * @swagger
 * /v1/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     description: Retrieve a list of all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
router.get("/v1/ingredients", ingredientController.getIngredients);

/**
 * @swagger
 * /v1/ingredients/{ingredientID}:
 *   get:
 *     summary: Get an ingredient by ID
 *     description: Retrieve a single ingredient by its ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */
router.get(
  "/v1/ingredients/:ingredientID",
  ingredientController.getIngredientById
);

export default router;
