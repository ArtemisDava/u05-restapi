import Category from "../models/category.model.js"; 
import checkIfExists from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

const fields = ['id', 'name', 'image', 'description'];

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
      errorHandler(res, 500, "Error fetching categories");
    }
  },

  getCategoryById: async (req, res) => {
    // TODO: Refactor to encapsulate into function
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseInt(categoryId);
    } catch(error) {
      errorHandler(res, 500, `Invalid category '${categoryID}'`);
    }
      
    try {
      let category = await Category.findOne({ id: categoryId });
      if (!category)
        return errorHandler(res, 404, "Category not found");

      category = filterFields(category, fields);

      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      errorHandler(res, 500, `Fetching category '${categoryId}'`);
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, image, description } = req.body;

      if(!name) {
        return errorHandler(res, 400, "Name is required");
      }

      // TODO: Sanitize inputs

      // Check if name already exists
      let exists = await checkIfExists(Category, { name }, res);
      if (exists) return;

      // Create new category
      const category = new Category({
        name,
        image,
        description,
      });

      try {
        await category.save();
      } catch (error) {
        errorHandler(res, 500, error.message);
      }

      res.status(201).json({ success: true, data: category });
    } catch (error) {
      errorHandler(res, 500, "Creating category");
    }
  },

  updateCategory: async (req, res) => {
    // TODO: Refactor to encapsulate into function
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseInt(categoryId);
    } catch(error) {
      errorHandler(res, 500, `Invalid category ID '${categoryID}'`);
    }
      
    try {
      const { name, image, description } = req.body;

      const category = await Category.findOne({ id: categoryId });
      
      if (!category)
        return errorHandler(res, 404, `Category '${categoryId}' not found`);

      // TODO: Sanitize inputs

      category.name = name || category.name;

      // Check if name already exists
      let exists = await checkIfExists(Category, { name: category.name }, res);
      if (exists) return;

      category.image = image || category.image;
      category.description = description || category.description;

      try {
        await category.save();
      } catch (error) {
        errorHandler(res, 500, error.message);
      }

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      errorHandler(res, 500, `Updating category '${categoryId}'`);
    }
  },

  deleteCategory: async (req, res) => {
    // TODO: Refactor to encapsulate into function
    let categoryId = req.params.categoryID;

    try {
      categoryId = parseInt(categoryId);
    } catch(error) {
      errorHandler(res, 500, `Invalid category ID '${categoryID}'`);
    }

    try {
      const deletedCount = (await Category.deleteOne({ id: categoryId })).deletedCount;

      res.status(200).json({ success: true, count: deletedCount });
    } catch (error) {
      errorHandler(res, 500, `Deleting category '${categoryId}'`);
    }
  },
};

export default categoryController;
