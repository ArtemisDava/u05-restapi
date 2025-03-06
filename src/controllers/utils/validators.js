import mongoose from "mongoose";

const validate= {
    Id: (value, fieldName, res) => {
        if (isNaN(value)) {
            res.status(400).json({
            success: false,
            message: `${fieldName} is required`,
            });
            return false;
        }
        return true;
        },

  validateField: (value, fieldName, res) => {
    if (!value) {
      res.status(400).json({
        success: false,
        message: `${fieldName} is required`,
      });
      return false;
    }
    return true;
  },
};



export default validate;



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
