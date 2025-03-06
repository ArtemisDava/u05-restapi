import express from "express";
import categoryController from "../controllers/category.controller.js";
// import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Protected routes for authenticated admins
router.put(
  "/v1/admin/categories/:categoryID",
  categoryController.updateCategoryByAdmin
);
router.delete(
  "/v1/admin/categories/:categoryID",
  categoryController.deleteCategoryByAdmin
);
router.post("/v1/admin/categories", categoryController.createCategoryByAdmin);

// Public routes
router.get("/v1/categories/:categoryID", categoryController.getCategoryById);
router.get("/v1/categories", categoryController.getAllCategories);

export default router;
