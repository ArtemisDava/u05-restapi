import express from "express";
import UserController from "../controllers/user.controller.js";
import isAdminMiddleware from "../middleware/admin.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


// Admin operations on users (with admin middleware)
router.get("/v1/admin/users/:userID", isAdminMiddleware, UserController.getUserByAdmin);
router.put("/v1/admin/users/:userID", isAdminMiddleware, UserController.updateUserByAdmin);
router.delete("/v1/admin/users/:userID", isAdminMiddleware, UserController.deleteUserByAdmin);

// Routes for all users (with admin middleware)
router.get("/v1/admin/users", isAdminMiddleware, UserController.getAllUsersByAdmin);
router.post("/v1/admin/users", isAdminMiddleware, UserController.createUserByAdmin);

// // User operations (with auth middleware)
router.get("/v1/users/:userID", authMiddleware, UserController.getUser);
router.patch("/v1/users/:userID", authMiddleware, UserController.updateUser);
router.delete("/v1/users/:userID", authMiddleware, UserController.deleteUser);


// // User favorites routes (with auth middleware)
router.get("/v1/users/:userID/favorites", authMiddleware, UserController.getUserFavorites);
router.post("/v1/users/:userID/favorites/:recipeID", authMiddleware, UserController.addFavorite);
router.put("/v1/users/:userID/favorites/:recipeID", authMiddleware, UserController.updateFavorite);
router.delete("/v1/users/:userID/favorites/:recipeID", authMiddleware, UserController.deleteFavorite);

export default router;