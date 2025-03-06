import express from "express";
import categoryController from "../controllers/category.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Protected routes for authenticated admins
router.put(
  "/v1/admin/categories/:categoryID",
  categoryController.updateCategory
);
router.delete(
  "/v1/admin/categories/:categoryID",
  categoryController.deleteCategory
);
router.post("/v1/admin/categories", categoryController.createCategory);

// Public routes
router.get("/v1/categories/:categoryID", categoryController.getCategoryById);
router.get("/v1/categories", categoryController.getCategories);

export default router;
