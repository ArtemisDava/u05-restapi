  // Utility function to transform category data

const filterFields = (data, fields) => {
  let isObject = false;
  if (!Array.isArray(data)) {
    isObject = true;
    data = [data];
  }

  data = data.map((item) => {
    const newItem = {};
    fields.forEach((field) => {
      newItem[field] = item[field];
    });

    return newItem;
  });

  return isObject ? data[0] : data;
};

export default filterFields;