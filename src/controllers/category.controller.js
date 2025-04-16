import Category from "../models/category.model.js";
import Recipe from "../models/recipe.model.js";
import { checkIfExists, convertToCapitalizedLetter, convertToCapitalizedLetters, parseId, sanitizeName, sanitizeDescription } from "./utils/validators.js";
import errorHandler from "./utils/error.js";
import filterFields from "./utils/transform-data.js";
import e from "express";

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

      // Validate required name field
      if (!name) return errorHandler(res, 400, "Name is required");
 
      // Sanitize name
      const nameValidation = sanitizeName(name, 'Name');
      if (nameValidation.message)
        return errorHandler(res, 400, nameValidation.message);

      // Process name to be capitalized
      const transformedName = convertToCapitalizedLetters(name);
      
      // Check if category already exists
      let exists = await checkIfExists(Category, { name: transformedName });
      if (exists)
        return errorHandler(res, 400, `Category '${transformedName}' already exists`);
      
      // If description is provided, sanitize it
      let transformedDescription = '';
      if (description){
        const descValidation = sanitizeDescription(description, 'Description');
        if (descValidation.message){
          return errorHandler(res, 400, descValidation.message);
        }
        transformedDescription = convertToCapitalizedLetter(description);
      }

      const category = new Category({
        name: transformedName,
        image: image || undefined,
        description: transformedDescription || undefined,
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

     if(name !== undefined) {
      const nameValidation = sanitizeName(name, 'Name');
      if (nameValidation.message) {
        return errorHandler(res, 400, nameValidation.message);
      }

      // Process name to be capitalized
      const transformedName = convertToCapitalizedLetters(nameValidation.sanitized);
    
      
      try {
        const exists = await checkIfExists(Category, { 
          name: transformedName, 
          id: { $ne: categoryId } 
        });
        if (exists) {
          return errorHandler(
            res,
            400,
            `'${transformedName}' matches an existing category name!`
          );
        }
        category.name = transformedName;
      } catch (dbError) {
        return errorHandler(res, 500, 'Error checking category name');
      }
    }
      // Handle description update
      if (description !== undefined) {
        if (description === '') {
          category.description = '';
        } else {
        const descValidation = sanitizeDescription(description, 'Description');
        if (descValidation.message){
          return errorHandler(res, 400, descValidation.message);
        }
        const transformedDescription = convertToCapitalizedLetter(descValidation.sanitized);
        category.description = transformedDescription;
      }
     }
      
      // Handle image update
      if (image !== undefined) {
        category.image = image || null;
      }

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
