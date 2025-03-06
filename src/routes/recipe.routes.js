import express from "express";
import RecipeController from "../controllers/recipe.controller.js";
import isAdminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Protected routes for authenticated admins
router.put("/v1/admin/recipes/:recipeID", isAdminMiddleware, RecipeController.updateRecipeByAdmin);
router.delete("/v1/admin/recipes/:recipeID", isAdminMiddleware, RecipeController.deleteRecipeByAdmin);
router.post("/v1/admin/recipes", isAdminMiddleware, RecipeController.createRecipeByAdmin);

// Public routes
router.get("/v1/recipes/:recipeID", RecipeController.getRecipeById);
router.get("/v1/recipes", RecipeController.getAllRecipes);

export default router;