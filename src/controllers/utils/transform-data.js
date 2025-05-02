const filterFields = (data, fields) => {
  let isObject = false;
  if (!Array.isArray(data)) {
    isObject = true;
    data = [data];
  }

  data = data.map((item) => {
    const newItem = {};
    fields.forEach((field) => {
      if (field === "ingredients" && Array.isArray(item.ingredients)) {
        newItem.ingredients = item.ingredients.map((i) => ({
          name: i.ingredient?.name || "",
          ingredient: i.ingredient?._id || i.ingredient,
          quantity: i.quantity,
          unit: i.unit,
        }));
      } else {
        newItem[field] = item[field];
      }
    });
    return newItem;
  });

  return isObject ? data[0] : data;
};

export default filterFields;
