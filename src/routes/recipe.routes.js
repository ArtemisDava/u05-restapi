import express from "express";
import RecipeController from "../controllers/recipe.controller.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/recipes:
 *   post:
 *     summary: Create a new recipe
 *     description: |
 *       Create a new recipe with ingredients and instructions.
 *       
 *       Required fields:
 *       - name: Must be unique
 *       - ingredients: Array of ingredient objects
 *       - instructions: Array of preparation steps
 *       - category: Valid category ID
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, ingredients, instructions, category]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Unique name starting with uppercase letter
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [ingredient, quantity] 
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       format: objectid
 *                       example: _objectID
 *                       description: Valid ingredient _objectID 
 *                     quantity:
 *                       type: number
 *                       description: Required amount
 *                     unit:
 *                       type: string
 *                       description: Measurement unit
 *               alternatives:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       format: objectid
 *                       example: _objectID
 *                       description: Alternative ingredient _objectID
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
 *                 nullable: true 
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Step-by-step preparation instructions
 *               category:
 *                 type: string
 *                 format: objectid
 *                 example: _objectID
 *                 description: Valid category _objectID    
 *     responses:
 *       200:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, data]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Spaghetti Carbonara"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredient:
 *                             type: string
 *                             example: "67cb63ca28632f4025cfba65"
 *                           quantity:
 *                             type: number
 *                             example: 200
 *                           unit:
 *                             type: string
 *                             example: "g"
 *                     alternatives:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredient:
 *                             type: string
 *                             example: "67cb63ca28632f4025cfba64"
 *                           quantity:
 *                             type: number
 *                             example: 100
 *                           unit:
 *                             type: string
 *                             example: "g"
 *                     instructions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Boil pasta according to package instructions."
 *                         - "Whisk eggs and cheese in a bowl."
 *                     category:
 *                       type: string
 *                       example: "67cb58f5d7fa6938b3534adf"
 *                     _id:
 *                       type: string
 *                       example: "67fafb205569a55c70b98e65"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-12T23:45:36.182Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-12T23:45:36.182Z"
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     __v:
 *                       type: integer
 *                       example: 0
 *             example:
 *               success: true
 *               data:
 *                 name: "Spaghetti Carbonara"
 *                 ingredients:
 *                   - ingredient: "67cb63ca28632f4025cfba65"
 *                     quantity: 200
 *                     unit: "g"
 *                   - ingredient: "67cb63ca28632f4025cfba60"
 *                     quantity: 3
 *                     unit: "whole"
 *                 alternatives:
 *                   - ingredient: "67cb63ca28632f4025cfba64"
 *                     quantity: 100
 *                     unit: "g"
 *                 instructions:
 *                   - "Boil pasta according to package instructions."
 *                   - "Whisk eggs and cheese in a bowl."
 *                 category: "67cb58f5d7fa6938b3534adf"
 *                 _id: "67fafb205569a55c70b98e65"
 *                 createdAt: "2025-04-12T23:45:36.182Z"
 *                 updatedAt: "2025-04-12T23:45:36.182Z"
 *                 id: 9
 *                 __v: 0
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Missing required fields (name, ingredients, instructions, category)
 *           - Name not starting with uppercase letter (fixakoden)
 *           - Duplicate recipe name (names must be unique)
 *           - Invalid ingredient _id
 *           - Invalid category _id 
 *       500:
 *         description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.post("/v1/admin/recipes", RecipeController.createRecipe);

/**
 * @swagger
 * /v1/admin/recipes/{recipeID}:
 *   put:
 *     summary: Update a recipe
 *     description: |
 *       Update an existing recipe. All fields are optional.
 *       
 *       Field Rules:
 *       - name: Must be unique if provided
 *       - ingredients: Must reference valid ingredient _objectIDs
 *       - category: Must reference valid category _objectID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recipe to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       format: objectid
 *                       example: _objectID
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
 *               alternatives:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       format: objectid
 *                       example: _objectID
 *                     quantity:
 *                      type: number
 *                     unit:    
 *                       type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *                 format: objectid
 *                 example: _objectID
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, data]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67fafb205569a55c70b98e65"
 *                     name:
 *                       type: string
 *                       example: "Updated Recipe Name"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredient:
 *                             type: string
 *                             example: "67cb63ca28632f4025cfba65"
 *                           quantity:
 *                             type: number 
 *                             example: 200
 *                           unit:
 *                             type: string
 *                             example: "g"
 *                     alternatives:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredient:
 *                             type: string
 *                             example: "67cb63ca28632f4025cfba64"
 *                           quantity: 
 *                             type: number  
 *                             example: 100
 *                           unit:
 *                             type: string
 *                             example: "g"
 *                     instructions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Boil pasta according to package instructions."
 *                         - "Whisk eggs and cheese in a bowl."
 *                     category:
 *                       type: string
 *                       example: "67cb58f5d7fa6938b3534adf"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-12T23:45:36.182Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-12T23:45:36.182Z"
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     __v:
 *                       type: integer
 *                       example: 0
 *             example:
 *               success: true
 *               data:
 *                 name: "Updated Recipe Name"
 *                 ingredients:
 *                   - ingredient: "67cb63ca28632f4025cfba65"
 *                     quantity: 200
 *                     unit: "g"
 *                   - ingredient: "67cb63ca28632f4025cfba60"
 *                     quantity: 3
 *                     unit: "whole"
 *                 alternatives:
 *                   - ingredient: "67cb63ca28632f4025cfba64"
 *                     quantity: 100
 *                     unit: "g"
 *                 instructions:
 *                   - "Boil pasta according to package instructions."
 *                   - "Whisk eggs and cheese in a bowl."
 *                 category: "67cb58f5d7fa6938b3534adf"
 *                 _id: "67fafb205569a55c70b98e65"
 *                 createdAt: "2025-04-12T23:45:36.182Z"
 *                 updatedAt: "2025-04-12T23:45:36.182Z"
 *                 id: 9
 *                 __v: 0
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Malformed recipeID (must be a valid string ID)
 *           - Duplicate recipe name (names must be unique)
 *           - Invalid ingredient _objectID
 *           - Invalid category _objectID
 *       404:
 *         description: |
 *           Not Found - Recipe not found:
 *           - No recipe exists with the specified ID
 *           - RecipeID may have been deleted
 *       500:
 *         description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.put("/v1/admin/recipes/:recipeID", RecipeController.updateRecipe);

/**
 * @swagger
 * /v1/admin/recipes/{recipeID}:
 *   delete:
 *     summary: Permanently delete a recipe
 *     description: |
 *       Deletes a recipe by its ID.
 *       - Deletion is irreversible
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recipe to delete
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, count]
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   example: true
 *                 count: 
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: |
 *           Bad Request - Cannot delete recipe because:
 *           - Malformed recipeID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Recipe not found:
 *           - No recipe exists with the specified ID
 *           - RecipeID may have been already deleted
 *       500:
 *         description: |
 *           Internal Server Error - Deletion failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.delete("/v1/admin/recipes/:recipeID", RecipeController.deleteRecipe);

/**
 * @swagger
 * /v1/recipes:
 *   get:
 *     summary: List all available recipes
 *     description: |
 *       Retrieves a paginated list of all recipes.
 *       - Returns basic recipe information
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successful retrieval of recipe list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, count, data]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Spaghetti Carbonara"
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient:
 *                               type: string
 *                               example: "67cb63ca28632f4025cfba65"
 *                             quantity:
 *                               type: number
 *                               example: 200
 *                             unit:
 *                              type: string
 *                              example: "g"
 *                       alternatives:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient:
 *                               type: string
 *                               example: "67cb63ca28632f4025cfba64"
 *                             quantity:
 *                               type: number
 *                               example: 100
 *                             unit:
 *                               type: string
 *                               example: "g"
 *                       instructions:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 
 *                             - "Saute onion and garlic until fragrant."
 *                             - "Add chicken and cook until browned."
 *                             - "Add spices and simmer for 20 minutes."
 *                       category:
 *                         type: string  
 *                         example: "67cb58f5d7fa6938b3534adf"
 *             example:
 *               success: true
 *               count: 10
 *               data:
 *                 - id: 1
 *                   name: "Chicken Curry"
 *                   ingredients:
 *                     - ingredient: "67cb63ca28632f4025cfba65"
 *                       quantity: 200
 *                       unit: "g"
 *                     - ingredient: "67cb63ca28632f4025cfba60"
 *                       quantity: 3
 *                       unit: "whole"
 *                   alternatives:
 *                     - ingredient: "67cb63ca28632f4025cfba64"
 *                       quantity: 100
 *                       unit: "g"
 *                   instructions:
 *                     - "Saute onion and garlic until fragrant."
 *                     - "Add chicken and cook until browned."
 *                     - "Add spices and simmer for 20 minutes."
 *                   category: "67cb58f5d7fa6938b3534adf"
 *                 - id: 2
 *                   name: "Pasta Primavera"
 *                   ingredients:
 *                     - ingredient: "67cb63ca28632f4025cfba65"
 *                       quantity: 200
 *                       unit: "g"
 *                     - ingredient: "67cb63ca28632f4025cfba60"
 *                       quantity: 3
 *                       unit: "whole"
 *                   alternatives:
 *                     - ingredient: "67cb63ca28632f4025cfba64"
 *                       quantity: 100
 *                       unit: "g"
 *                   instructions:
 *                     - "Cook pasta according to package instructions."
 *                     - "Saute garlic in olive oil."
 *                     - "Add chopped tomatoes and cook until soft."
 *                     - "Toss in cooked pasta and torn basil leaves."
 *                     - "Season with salt."
 *                   category: "67cb58f5d7fa6938b3534adf"
 *       500:
 *         description: |
 *           Internal Server Error - Failed to retrieve recipes due to:
 *           - Database connection issues
 *           - Unexpected server error
 *               
 */
router.get("/v1/recipes", RecipeController.getRecipes);

/**
 * @swagger
 * /v1/recipes/{recipeID}:
 *   get:
 *     summary: Get recipe details by ID
 *     description: |
 *       Retrieve complete information about a specific recipe.
 *       - Includes ingredients, alternatives and instructions
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recipe to retrieve
 *     responses:
 *       200:
 *         description:  Successful retrieval of recipe details
  *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, data]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Spaghetti Carbonara"
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient:
 *                               type: string
 *                               example: "67cb63ca28632f4025cfba65"
 *                             quantity:
 *                               type: number
 *                               example: 200
 *                             unit:
 *                              type: string
 *                              example: "g"
 *                       alternatives:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient:
 *                               type: string
 *                               example: "67cb63ca28632f4025cfba64"
 *                             quantity:
 *                               type: number
 *                               example: 100
 *                             unit:
 *                               type: string
 *                               example: "g"
 *                       instructions:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 
 *                             - "Saute onion and garlic until fragrant."
 *                             - "Add chicken and cook until browned."
 *                             - "Add spices and simmer for 20 minutes."
 *                       category:
 *                         type: string  
 *                         example: "67cb58f5d7fa6938b3534adf"
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   name: "Chicken Curry"
 *                   ingredients:
 *                     - ingredient: "67cb63ca28632f4025cfba65"
 *                       quantity: 200
 *                       unit: "g"
 *                     - ingredient: "67cb63ca28632f4025cfba60"
 *                       quantity: 3
 *                       unit: "whole"
 *                   alternatives:
 *                     - ingredient: "67cb63ca28632f4025cfba64"
 *                       quantity: 100
 *                       unit: "g"
 *                   instructions:
 *                     - "Saute onion and garlic until fragrant."
 *                     - "Add chicken and cook until browned."
 *                     - "Add spices and simmer for 20 minutes."
 *                   category: "67cb58f5d7fa6938b3534adf"
 *       400:
 *         description: |
 *           Bad Request - Invalid request due to:
 *           - Malformed recipeID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Recipe not found:
 *           - No recipe exists with the specified ID
 *           - RecipeID may have been deleted
 *       500:
 *        description: |
 *           Internal Server Error - Failed to retrieve recipe due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.get("/v1/recipes/:recipeID", RecipeController.getRecipeById);

export default router;
