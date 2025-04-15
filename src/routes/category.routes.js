import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/categories:
 *   post:
 *     summary: Create a new category
 *     description: |
 *       Required fields:
 *       - name: Must start with uppercase letter, letters only
 *       
 *       Optional fields:
 *       - description: Brief category description
 *       - image: URL with valid image extensions (png, jpg, jpeg, gif, svg) 
 *     tags: [Categories]   
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
 *                 description: Unique category name starting with uppercase letter.
 *               description:
 *                 type: string
 *                 description: Optional description of the category.
 *                 nullable: true
 *               image:
 *                 type: string   
 *                 format: uri
 *                 description: "URL must end with: .png, .jpg, .jpeg, .gif, or .svg"
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Category created successfully!
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
 *                       example: "Desserts"
 *                     _id:
 *                       type: string
 *                       example: "67d3db333c8202df8bfb9d8b"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T07:30:59.400Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T07:30:59.400Z"
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     __v:
 *                       type: integer 
 *                       example: 0
 *             example: 
 *               success: true
 *               data: 
 *                 name: "Desserts"
 *                 _id: "67d3db333c8202df8bfb9d8b"
 *                 createdAt: "2025-03-14T07:30:59.400Z"
 *                 updatedAt: "2025-03-14T07:30:59.400Z"
 *                 id: 1
 *                 __v: 0
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Missing required fields (name)
 *           - Name not starting with uppercase letter (fixakoden)
 *           - Duplicate category name (names must be unique)
 *           - Invalid image URL (must be a valid URL ending with .png, .jpg, .jpeg or .gif)
 *       500:
 *         description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.post("/v1/admin/categories", categoryController.createCategory);

/**
 * @swagger
 * /v1/admin/categories/{categoryID}:
 *   put:
 *     summary: Update a category
 *     description: |
 *       Update an existing category. Provide any combination of fields to update.
 *       
 *       Field Rules: 
 *       - name: Must be unique and start with uppercase letter
 *       - description: Must start with uppercase letter
 *       - image: Valid URL ending with .png, .jpg, .jpeg, .gif, or .svg  
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New unique name starting with uppercase letter
 *               description:
 *                 type: string
 *                 description: Updated description text
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: Valid image URL with supported extensions
 *     responses:
 *       200:
 *         description: Category updated successfully!
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
 *                       example: "67d3db333c8202df8bfb9d8b"
 *                     name:
 *                       type: string
 *                       example: "Desserts"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T07:30:59.400Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T07:30:59.400Z"
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     __v:
 *                       type: integer 
 *                       example: 0
 *             example: 
 *               success: true
 *               data: 
 *                 name: "Desserts"
 *                 _id: "67d3db333c8202df8bfb9d8b"
 *                 createdAt: "2025-03-14T07:30:59.400Z"
 *                 updatedAt: "2025-03-14T07:30:59.400Z"
 *                 id: 1
 *                 __v: 0
 *       400:
 *         description: |
 *           Bad Request - Invalid input due to:
 *           - Malformed categoryID (must be a valid string ID)
 *           - Duplicate category name (names must be unique)
 *           - Invalid image URL (must be a valid URL ending with .png, .jpg, .jpeg or .gif) (fixakoden)
 *           - Name not starting with uppercase letter (fixakoden)
 *       404:
 *         description: |
 *           Not Found - Category not found:
 *           - No category exists with the specified ID
 *           - Category may have been deleted
 *       500:
 *         description: |
 *           Internal Server Error - Operation failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.put(
  "/v1/admin/categories/:categoryID",
  categoryController.updateCategory
);

/**
 * @swagger
 * /v1/admin/categories/{categoryID}:
 *   delete:
 *     summary: Permanently delete a category
 *     description: |
 *       Deletes a category by its unique identifier.
 *       - Operation will fail if the category is referenced by any recipes
 * 
 *       Restrictions:
 *       - Operation will fail if category is referenced by any recipes
 *       - Deletion is irreversible
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, count]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Operation status
 *                 count:
 *                   type: integer
 *                   example: 1
 *                   description: Number of categories deleted
 *       400:
 *         description: |
 *           Bad Request - Cannot delete category because:
 *           - It is currently being used in one or more recipes
 *           - Malformed categoryID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Category not found:
 *           - No category exists with the specified ID
 *           - Category may have been already deleted
 *       500:
 *         description: |
 *           Internal Server Error - Deletion failed due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.delete(
  "/v1/admin/categories/:categoryID",
  categoryController.deleteCategory
);

/**
 * @swagger
 * /v1/categories:
 *   get:
 *     summary: List all available categories
 *     description: |
 *       Retrieves a paginated list of all food categories.
 *       - Returns basic category information
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful retrieval of category list
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
 *                   example: 2
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
 *                         example: "Italian"
 *                       image:
 *                         type: string
 *                         format: uri
 *                         example: "https://example.com/images/italian.jpg"
 *                       description:
 *                         type: string
 *                         example: "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors."
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - id: 1
 *                   name: "Italian"
 *                   image: "https://example.com/images/italian.jpg"
 *                   description: "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors."
 *                 - id: 2
 *                   name: "Mexican"
 *                   image: "https://example.com/images/mexican.jpg"
 *                   description: "Bold and spicy Mexican dishes with corn, beans, and chili peppers."
 *       500:
 *         description: |
 *           Internal Server Error - Failed to retrieve categories due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.get("/v1/categories", categoryController.getCategories);

/**
 * @swagger
 * /v1/categories/{categoryID}:
 *   get:
 *     summary: Get category details by ID
 *     description: |
 *       Retrieve detailed information about a specific category.
 *       - Returns complete category data
 *       - Includes name, description and image URL
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of category details
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
 *                       example: "Italian"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/images/italian.jpg"
 *                     description:
 *                       type: string
 *                       example: "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors."
 *             example:
 *               success: true
 *               data: 
 *                 id: 1
 *                 name: "Italian"
 *                 image: "https://example.com/images/italian.jpg"
 *                 description: "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors."
 *       400:
 *         description: |
 *           Bad Request - Invalid request due to:
 *           - Malformed categoryID (must be a valid string ID)
 *       404:
 *         description: |
 *           Not Found - Category not found:
 *           - No category exists with the specified ID
 *           - Category may have been deleted
 *       500:    
 *         description: |
 *           Internal Server Error - Failed to retrieve category due to:
 *           - Database connection issues
 *           - Unexpected server error
 */
router.get("/v1/categories/:categoryID", categoryController.getCategoryById);

export default router;
