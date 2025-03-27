import mongoose from "mongoose";

const validatePattern = function (regex, errorMessage) {
  return {
    validator(value) {
      return regex.test(value);
    },
    message: errorMessage || `Value does not match the specified pattern.`,
  };
};

const validateUnique = function (modelName, fieldName, errorMessage) {
  return {
    async validator(value) {
      const lowerCaseValue = value.toLowerCase();

      // Check if another document with the same lowercase field value exists
      const existingDocument = await mongoose.models[modelName].findOne({
        [fieldName]: { $regex: new RegExp(`^${lowerCaseValue}$`, "i") }, // Case-insensitive regex
      });

      if (
        existingDocument &&
        existingDocument._id.toString() !== this._id.toString()
      ) {
        return false;
      }

      return true;
    },
    message: errorMessage || `${fieldName} must be unique (case-insensitive).`,
  };
};

const validateIfExists = async function (modelName, id) {
  try {
    const model = mongoose.models[modelName];
    if (!model) {
      return false;
    }
    const exists = await model.findOne({ id: id });
    return !!exists; // Convert to boolean
  } catch (error) {
    return false;
  }
};

export { validatePattern, validateUnique, validateIfExists };
