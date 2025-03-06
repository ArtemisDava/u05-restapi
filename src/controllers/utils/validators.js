import errorHandler from "./error.js";

const checkIfExists = async (model, query, res) => {
  const exists = await model.countDocuments(query) !== 0;
  if (exists)
    return errorHandler(res, 400, `${model.modelName} already exists`);

  return false;
};

export default checkIfExists;



//  // Utility function to validate category ID
//  _validateCategoryId: (categoryId, res) => {
//     if (isNaN(categoryId)) {
//       res.status(400).json({
//         success: false,
//         message: "Category ID must be a number",
//       });
//       return false;
//     }
//     return true;
//   },
