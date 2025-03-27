// import express from "express";
// import UserController from "../controllers/user.controller.js";
// // import isAdminMiddleware from "../middleware/admin.middleware.js";
// // import authMiddleware from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Admin operations on users (with admin middleware)
// router.get("/v1/admin/users/:userID", UserController.getUserByAdmin);
// router.put("/v1/admin/users/:userID", UserController.updateUserByAdmin);
// router.delete("/v1/admin/users/:userID", UserController.deleteUserByAdmin);

// // Routes for all users (with admin middleware)
// router.get("/v1/admin/users", UserController.getAllUsersByAdmin);
// router.post("/v1/admin/users", UserController.createUserByAdmin);

// // // User operations (with auth middleware)
// router.get("/v1/users/:userID", UserController.getUser);
// router.patch("/v1/users/:userID", UserController.updateUser);
// router.delete("/v1/users/:userID", UserController.deleteUser);

// // // User favorites routes (with auth middleware)
// router.get("/v1/users/:userID/favorites", UserController.getUserFavorites);
// router.post(
//   "/v1/users/:userID/favorites/:recipeID",
//   UserController.addFavorite
// );
// router.put(
//   "/v1/users/:userID/favorites/:recipeID",
//   UserController.updateFavorite
// );
// router.delete(
//   "/v1/users/:userID/favorites/:recipeID",
//   UserController.deleteFavorite
// );

// export default router;
