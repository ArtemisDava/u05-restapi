// import express from "express";
// import categoryController from "../controllers/category.controller.js";
// // import isAdminMiddleware from "../middleware/admin.middleware.js";

// const router = express.Router();

// // Protected routes for authenticated admins
// router.put(
//   "/v1/admin/categories/:categoryID",
//   categoryController.updateCategory
// );
// router.delete(
//   "/v1/admin/categories/:categoryID",
//   categoryController.deleteCategory
// );
// router.post("/v1/admin/categories", categoryController.createCategory);

// // Public routes
// router.get("/v1/categories/:categoryID", categoryController.getCategoryById);
// router.get("/v1/categories", categoryController.getCategories);

// export default router;

import express from "express";
import categoryController from "../controllers/category.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/categories:
 *   post:
 *     summary: Create a new category
 *     description: |
 *       Create a new category:
 *       - This endpoint is **restricted** to admin users.
 *       - The category name must be **unique** and start with an uppercase letter.
 *       - Allowed characters: letters only. 
 *       
 *          Example: "Desserts"
 *     tags: [Categories]
 *     parameters:
 *       - in: body
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: "Desserts"
 *         description: |
 *           The name of the category.  
 *           - **Must be unique.**  
 *           - **Must start with an uppercase letter.**  
 *           - **Allowed characters:** letters only.
 *           
 *       - in: body
 *         name: description
 *         required: false
 *         schema:
 *           type: string
 *           example: "Sweet treats and desserts"
 *         description: A brief description of the category.
 *       
 *       - in: body
 *         name: image
 *         required: false
 *         schema:
 *           type: string
 *           example: "https://example.com/desserts.jpg"
 *         description: "must be a valid URL and end with one of the following extensions: png, jpg, jpeg, gif, svg"
 *    
 *      
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *           example:
 *             name: "Desserts"
 *             description: "Sweet treats and desserts"
 *             image: "https://example.com/desserts.jpg"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               id: 1 
 *               name: "Desserts"
 *               description: "Sweet treats and desserts"
 *               image: "https://example.com/desserts.jpg"
 *       400:
 *         description: Invalid input (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (Admin only)
 */
router.post("/v1/admin/categories", categoryController.createCategory);

/**
 * @swagger
 * /v1/admin/categories/{categoryID}:
 *   put:
 *     summary: Update a category
 *     description: |
 *       Update an existing category (Admin only).  
 *       - The **category ID** must be provided in the path.  
 *       - The request body must follow the Category schema.  
 *       - Only authorized admins can perform this action.
 *       
 *          Example categoryID: 1
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *          
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               id: "123"
 *               name: "Updated Category Name"
 *               description: "Updated category description"
 *               image: "https://example.com/updated-image.jpg"
 *       400:
 *         description: Invalid input (e.g., missing required fields or incorrect format)
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Category not found
 */
router.put(
  "/v1/admin/categories/:categoryID",
  categoryController.updateCategory
);

/**
 * @swagger
 * /v1/admin/categories/{categoryID}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete an existing category (Admin only)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized (Admin only)
 *       404:
 *         description: Category not found
 */
router.delete(
  "/v1/admin/categories/:categoryID",
  categoryController.deleteCategory
);

/**
 * @swagger
 * /v1/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/v1/categories", categoryController.getCategories);

/**
 * @swagger
 * /v1/categories/{categoryID}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a single category by its ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get("/v1/categories/:categoryID", categoryController.getCategoryById);

export default router;
