import Category from "../models/category.model.js"; 
import validate from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import transform from "./utils/transform-data.js";

const categoryController = {

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({}).sort({ name: 1 });
      const transformedCategories = categories.map(
        transform.transformCategory
      );

      res.status(200).json({
        success: true,
        count: transformedCategories.length,
        data: transformedCategories,
      });
    } catch (error) {
      errorHandler(res, error, 500, "Error fetching categories");
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryID);
      if (!validate.Id(categoryId, res)) return;

      const category = await Category.findOne({ id: categoryId });

      if (!validate.validateField(category, "Category", res)) return;

      // Transform data to exclude MongoDB internals
      const transformedCategory =
        transform.transformCategory(category);
      res.status(200).json({
        success: true,
        data: transformedCategory,
      });
    } catch (error) {
      errorHandler(res, error, 500, "Error fetching category");
    }
  },

  createCategoryByAdmin: async (req, res) => {
    try {
      const { name, image, description } = req.body;

      if (!validate.validateField(name, "Name", res)) return;

      // Check if name already exists
      const existingCategoryName = await Category.findOne({ name });
      if (existingCategoryName) {
        return errorHandler(res, error, 400, "Category name exists already");
      }

      // Create new category
      const newCategory = new Category({
        name,
        image,
        description,
      });

      const createdCategory = await newCategory.save();

      res.status(201).json({ success: true, data: createdCategory });
    } catch (error) {
      errorHandler(res, error, 500, "Error creating category");
    }
  },

  updateCategoryByAdmin: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryID);

      if (!validate.Id(categoryId, res)) return;

      const { name, image, description } = req.body;

      const category = await Category.findOne({ id: categoryId });
      
      if (!category) {
        return errorHandler(res, error, 404, "Category not found");
      }

      category.name = name || category.name;
      category.image = image || category.image;
      category.description = description || category.description;

      const updatedCategory = await category.save();

      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      errorHandler(res, error, 500, "Error updating category");
    }
  },

  deleteCategoryByAdmin: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryID);

      if (!validate.Id(categoryId, res)) return;
    
      const category = await Category.findOne({ id: categoryId });

      if (!validate.validateField(category, "Category", res)) return;

      await category.deleteOne({ id: categoryId });

      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      errorHandler(res, error, 500, "Error deleting category");
    }
  },
};

export default categoryController;
