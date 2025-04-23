import express from "express";
import ingredientController from "../controllers/ingredient.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     description: |
 *       Create a new ingredient
 *       - Name must be unique
 *       - Image URL must be valid
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Unique name of the ingredient
 *               image:
 *                 type: string
 *                 description: "URL must end with: .png, .jpg, .jpeg, .gif, or .svg"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success,data]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Garlic"
 *                     _id:
 *                       type: string
 *                       format: uuid
 *                       example: "5f8d0c9b8c8d3e001f8e4a1b"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     __v:
 *                       type: integer
 *                       example: 0
 *             example:
 *               success: true
 *               data:
 *                 name: "Garlic"
 *                 _id: "5f8d0c9b8c8d3e001f8e4a1b"
 *                 createdAt: "2023-10-01T12:00:00Z"
 *                 updatedAt: "2023-10-01T12:00:00Z"
 *                 id: 1
 *                 __v: 0
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Missing required fields (name)
 *           - Duplicate ingredient name
 *           - Invalid image URL format
 *       500:
 *         description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.post("/v1/admin/ingredients", ingredientController.createIngredient);

/**
 * @swagger
 * /v1/admin/ingredients/{ingredientID}:
 *   put:
 *     summary: Update an ingredient
 *     description: |
 *       Update an existing ingredient 
 *       - Provide any combination of fields to update
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ingredient to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New unique name of the ingredient
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: "URL must end with: .png, .jpg, .jpeg, or .gif"
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
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
 *                       format: uuid
 *                       example: "5f8d0c9b8c8d3e001f8e4a1b"
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Updated Ingredient"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/images/updated_ingredient.jpg"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *             example:
 *               success: true
 *               data:
 *                 _id: "5f8d0c9b8c8d3e001f8e4a1b"
 *                 id: 1
 *                 name: "Updated Ingredient"
 *                 image: "https://example.com/images/updated_ingredient.jpg"
 *                 __v: 0
 *                 createdAt: "2023-10-01T12:00:00Z"
 *                 updatedAt: "2023-10-01T12:00:00Z"
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Malformed ingredientID (must be a valid string ID)
 *           - Duplicate ingredient name (names must be unique)
 *           - Invalid image URL format (must be a valid URL ending with .png, .jpg, .jpeg or .gif)
 *           - Name not starting with uppercase letter (fixakoden)
 *       404:
 *         description: |
 *           Not Found - Ingredient not found:
 *           - No ingredient exists with the specified ID
 *           - ingredientID may have been deleted 
 *       500:
 *        description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.put(
  "/v1/admin/ingredients/:ingredientID",
  ingredientController.updateIngredient
);

/**
 * @swagger
 * /v1/admin/ingredients/{ingredientID}:
 *   delete:
 *     summary: Permanently delete an ingredient
 *     description: |
 *       Permanently delete an ingredient
 *       - Operation will fail if ingredient is referenced by any recipes
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ingredient to delete
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
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
 *             example:
 *               success: true
 *               count: 1
 *       400:
 *         description: |
 *           Bad Request - Cannot delete ingredient because:
 *           - It is currently being used in one or more recipes
 *           - Malformed ingredientID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Ingredient not found:
 *           - No ingredient exists with the specified ID
 *           - ingredientID may have been already deleted
 *       500:
 *         description: |
 *           Internal Server Error - Deletion failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.delete(
  "/v1/admin/ingredients/:ingredientID",
  ingredientController.deleteIngredient
);

/**
 * @swagger
 * /v1/ingredients:
 *   get:
 *     summary: List all available ingredients
 *     description: Retrieve a paginated list of all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Successful retrieval of ingredient list
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
 *                   example: 1
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
 *                         example: "Garlic"
 *                       image:
 *                         type: string
 *                         format: uri
 *                         example: "https://example.com/images/garlic.jpg"
 *             example:
 *               success: true
 *               count: 1
 *               data:
 *                 - id: 1
 *                   name: "Garlic"
 *                   image: "https://example.com/images/garlic.jpg"
 *       500:
 *        description: |
 *           Internal Server Error - Failed to retrieve ingredients due to:
 *           - Database connection issues
 *           - Unexpected server error
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
 *         description: The ID of the ingredient to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of ingredient details
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
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Garlic"
 *                     image:
 *                      type: string
 *                      format: uri
 *                      example: "https://example.com/images/garlic.jpg"
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Garlic"
 *                 image: "https://example.com/images/garlic.jpg"
 *       400:
 *         description: |
 *           Bad Request - Invalid request due to:
 *           - Malformed ingredientID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Ingredient not found:
 *           - No ingredient exists with the specified ID
 *           - ingredientID may have been deleted
 *       500:
 *         description: |
 *           Internal Server Error - Failed to retrieve ingredient due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.get(
  "/v1/ingredients/:ingredientID",
  ingredientController.getIngredientById
);

export default router;
