const checkIfExists = async (model, query) => {
  return (await model.countDocuments(query)) > 0;
};

// const parseId = (req, res, idParam = "id") => {
//   let id = req.params[idParam];
//   if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
//     errorHandler(res, 400, `Invalid ID '${id}'`);
//     return null;
//   }
//   return parseInt(id, 10);
// };

const parseId = (id) => {
  if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
    throw `Invalid ID '${id}'`;
  }

  return parseInt(id, 10);
};

export { checkIfExists, parseId };
