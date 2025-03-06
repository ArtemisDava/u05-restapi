  // Utility function to transform category data

  const transform={
  transformCategory: (category) => {
    return {
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
    };
  },
};

export default transform;