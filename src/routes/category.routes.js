import express from "express";
import CategoryController from "../controllers/category.controller.js";
import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Protected routes for authenticated admins
router.put("/v1/admin/categories/:categoryID", isAdminMiddleware, CategoryController.updateCategoryByAdmin);
router.delete("/v1/admin/categories/:categoryID", isAdminMiddleware, CategoryController.deleteCategoryByAdmin);
router.post("/v1/admin/categories", isAdminMiddleware, CategoryController.createCategoryByAdmin);

// Public routes
router.get("/v1/categories/:categoryID", CategoryController.getCategoryById);
router.get("/v1/categories", CategoryController.getAllCategories);

export default router;
