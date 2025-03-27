import Category from "../models/category.model.js";
import Recipe from "../models/recipe.model.js";
import { checkIfExists, parseId } from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

// TO-DO: sanitize inputs

const fields = ["id", "name", "image", "description"];

const categoryController = {
  getCategories: async (_, res) => {
    try {
      let categories = await Category.find({}).sort({ name: 1 });

      categories = filterFields(categories, fields);

      res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      return errorHandler(res, 500, "Error fetching categories");
    }
  },

  getCategoryById: async (req, res) => {
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseId(categoryId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      let category = await Category.findOne({ id: categoryId });
      if (!category)
        return errorHandler(res, 404, `Category: '${categoryId}' not found`);

      category = filterFields(category, fields);

      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return errorHandler(res, 500, `Fetching category '${categoryId}'`);
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, image, description } = req.body;

      // TO-DO: sanitize inputs (name, image, description, _id)

      if (!name) return errorHandler(res, 400, "Name is required");

      // Check if name already exists
      let exists = await checkIfExists(Category, { name });
      if (exists)
        return errorHandler(res, 400, `Category '${name}' already exists`);

      // Create new category
      const category = new Category({
        name,
        image,
        description,
      });

      try {
        await category.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

      res.status(201).json({ success: true, data: category });
    } catch (error) {
      return errorHandler(res, 500, "Creating category");
    }
  },

  updateCategory: async (req, res) => {
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseId(categoryId);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const { name, image, description } = req.body;

      const category = await Category.findOne({ id: categoryId });
      if (!category)
        return errorHandler(res, 404, `Category: '${categoryId}' not found`);

      if (name) {
        let exists = await checkIfExists(Category, { name });
        if (exists) {
          return errorHandler(
            res,
            400,
            `'${name}' matches an existing category name!`
          );
        }
        category.name = name;
      }

      category.image = image ?? category.image;
      category.description = description ?? category.description;

      try {
        await category.save();
      } catch (error) {
        return errorHandler(res, 500, error.message);
      }

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      return errorHandler(res, 500, `Updating category '${categoryId}'`);
    }
  },

  deleteCategory: async (req, res) => {
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseId(req.params.categoryID);
    } catch (error) {
      return errorHandler(res, 400, error);
    }

    try {
      const category = await Category.findOne({ id: categoryId });
      if (!category) {
        return errorHandler(res, 404, `Category '${categoryId}' not found`);
      }

      const recipesUsingCategory = await Recipe.countDocuments({
        category: category._id,
      });

      if (recipesUsingCategory > 0) {
        errorHandler(
          res,
          400,
          `Category '${categoryId}' is used in ${recipesUsingCategory} recipes.`
        );
        return;
      }
      const deletedCount = (await Category.deleteOne({ _id: category._id }))
        .deletedCount;

      res.status(200).json({ success: true, count: deletedCount });
    } catch (error) {
      return errorHandler(res, 500, `Deleting category '${categoryId}'`);
    }
  },
};

export default categoryController;
