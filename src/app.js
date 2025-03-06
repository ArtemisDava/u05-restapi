import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
// import { specs, swaggerUI } from "./swagger.js";
import categoryRoutes from "./routes/category.routes.js";
// import ingredientRoutes from "./routes/ingredient.routes.js";
// import recipeRoutes from "./routes/recipe.routes.js";
// import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./database.js";

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Swagger API documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use("/api", categoryRoutes);
// app.use("/api", ingredientRoutes);
// app.use("/api", recipeRoutes);
// app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
