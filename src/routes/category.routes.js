import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @swagger
 * /v1/admin/categories:
 *   post:
 *     summary: Create a new category
 *     description: |
 *       Create a new category:
 *       - The category name must be **unique** and start with an uppercase letter.
 *       - Allowed characters: letters only. 
 * 
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
 *           - Must be unique.  
 *           - Must start with an uppercase letter. 
 *           - Allowed characters: letters only.
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
 *         description: "Must be a valid URL and end with one of the following extensions: png, jpg, jpeg, gif, svg"
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               success: false
 *               error: "Name is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               message: "Something went wrong!"
 */
router.post("/v1/admin/categories", categoryController.createCategory);

/**
 * @swagger
 * /v1/admin/categories/{categoryID}:
 *   put:
 *     summary: Update a category
 *     description: |
 *       Update an existing category.  
 *       - The **category ID** must be provided in the path.  
 *       - The request body must follow the Category schema.  
 *       
 *          Example categoryID: 1
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 * 
 *       - in: body
 *         name: name
 *         required: false   
 *         schema:
 *           type: string
 *           example: "Updated Category Name"
 *         description: The new name of the category **must be unique** and start with an **uppercase letter**.
 *      
 *       - in: body
 *         name: description
 *         required: false
 *         schema:
 *           type: string
 *           example: "Updated category description"
 *         description: The updated description of the category must start with an **uppercase letter**.
 *      
 *       - in: body
 *         name: image
 *         required: false
 *         schema:
 *           type: string
 *           example: "https://example.com/updated-image.jpg"
 *         description: |
 *           The updated image URL of the category must be a valid URL and end with one of the following extensions: png, jpg, jpeg, gif, svg.
 
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               success: false
 *               error: "Invalid ID 'format'"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               success: false
 *               error: "Category categoryID not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *              example:
 *                success: false
 *                error: "Category validation failed: name: Category name must start with an uppercase letter and contain only letters."
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
 *     description: Delete an existing category.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category/{categoryID}'
 *             example:
 *               "success": true
 *               "count": 1 
 * 
 *       400:
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category/{categoryID}'
 *             example:
 *               "success": false
 *               "error": "Category categoryID is used in 1 recipes."
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category/{categoryID}'
 *             example:
 *               "success": false
 *               "error": "Category categoryID not found"
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
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
 *            
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
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The categoryID
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *             example:
 *               success: true
 *               data: 
 *                 id: 1
 *                 name: "Italian"
 *                 image: "https://example.com/images/italian.jpg"
 *                 description: "Traditional Italian cuisine featuring pasta, pizza, and Mediterranean flavors."
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               success: false
 *               error: "Invalid ID 'format'"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               success: false
 *               error: "Category categoryID not found"
 */
router.get("/v1/categories/:categoryID", categoryController.getCategoryById);

export default router;
