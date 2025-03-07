import Category from "../models/category.model.js"; 
import { checkIfExists, parseId } from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";

// TO-DO: sanitize inputs

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
    const categoryId = parseId(req, res, "categoryID");
    if (categoryId === null) return;
      
    try {
      let category = await Category.findOne({ id: categoryId });
      if (!category) return errorHandler(res, 404, `Category: '${categoryId}' not found`);

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
        errorHandler(res, 500, error.message);
      }

      res.status(201).json({ success: true, data: category });
    } catch (error) {
      errorHandler(res, 500, "Creating category");
    }
  },

  updateCategory: async (req, res) => {
    const categoryId = parseId(req, res, "categoryID");
    if (categoryId === null) return;
      
    try {
      const { name, image, description } = req.body;

      const category = await Category.findOne({ id: categoryId });
      if (!category) return errorHandler(res, 404, `Category: '${categoryId}' not found`);
      
      if(name){
        let exists = await checkIfExists(Category, { name });
        if (exists){
          return errorHandler(res, 400, `'${name}' matches an existing category name!`
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
      errorHandler(res, 500, `Updating category '${categoryId}'`);
    }
  },

  deleteCategory: async (req, res) => {
    const categoryId = parseId(req, res, "categoryID");
    if (categoryId === null) return;

    try {
      const deletedCount = (await Category.deleteOne({ id: categoryId })).deletedCount;

      res.status(200).json({ success: true, count: deletedCount });
    } catch (error) {
      errorHandler(res, 500, `Deleting category '${categoryId}'`);
    }
  },
};

export default categoryController;
