import express from "express";
import IngredientController from "../controllers/ingredient.controller.js";
import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Protected routes for authenticated admins
router.put("/v1/admin/ingredients/:ingredientID", isAdminMiddleware, IngredientController.updateIngredientByAdmin);
router.delete("/v1/admin/ingredients/:ingredientID", isAdminMiddleware, IngredientController.deleteIngredientByAdmin);
router.post("/v1/admin/ingredients", isAdminMiddleware, IngredientController.createIngredientByAdmin);

// Public routes
router.get("/v1/ingredients/:ingredientID", IngredientController.getIngredientById);
router.get("/v1/ingredients", IngredientController.getAllIngredients);

export default router;