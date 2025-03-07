import errorHandler from "./error.js";

const checkIfExists = async (model, query) => {
  return await model.countDocuments(query) > 0;
};

const parseId = (req, res, idParam = "id") => {
  let id = req.params[idParam];
  if (!/^\d+$/.test(id)) {
    errorHandler(res, 400, `Invalid ID '${id}'`);
    return null;
  }
  return parseInt(id, 10);
};

export {checkIfExists, parseId}; ;


