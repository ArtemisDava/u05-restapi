const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const Recipe = require("../src/models/recipe.model");
const Ingredient = require("../src/models/ingredient.model");
const Category = require("../src/models/category.model");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Recipe Model", () => {
  it("should create a new recipe", async () => {
    const ingredient1 = new Ingredient({ id: 1, name: "Salt" });
    const ingredient2 = new Ingredient({ id: 2, name: "Pepper" });
    const category1 = new Category({ id: 1, name: "Indian" });

    await ingredient1.save();
    await ingredient2.save();
    await category1.save();

    const recipe = new Recipe({
      id: 1,
      name: "Salt and Pepper Chicken",
      ingredients: [
        { id: 1, quantity: 1, unit: "tsp" },
        { id: 2, quantity: 2, unit: "tsp" },
      ],
      instructions: [
        "Season the chicken with salt and pepper.",
        "Cook the chicken until done.",
      ],
      category: { id: 1 },
    });

    const savedRecipe = await recipe.save();
    expect(savedRecipe.id).to.equal(1);
    expect(savedRecipe.name).to.equal("Salt and Pepper Chicken");
    expect(savedRecipe.ingredients).to.have.lengthOf(2);
    expect(savedRecipe.instructions).to.have.lengthOf(2);
    expect(savedRecipe.category.id).to.equal(1);
  });

  it("should not create a recipe with duplicate id", async () => {
    // First create and save a category
    const category = new Category({ id: 1, name: "Italian" });
    await category.save();

    // Create and save the first recipe with id=1
    const firstRecipe = new Recipe({
      id: 1,
      name: "First Recipe",
      ingredients: [],
      instructions: ["Test instruction"],
      category: { id: 1 },
    });
    await firstRecipe.save();

    // Try to create another recipe with the same id=1
    const duplicateRecipe = new Recipe({
      id: 1, // Same ID as first recipe
      name: "Second Recipe",
      ingredients: [],
      instructions: ["Another test instruction"],
      category: { id: 1 },
    });

    // When we try to save it, we should get a duplicate key error
    let error = null;
    try {
      await duplicateRecipe.save();
      throw new Error("Should not reach this line"); // This should not execute if duplicate error occurs
    } catch (err) {
      error = err;
    }

    // Check that we got an error
    expect(error).to.exist;
    expect(error.code).to.equal(11000); // MongoDB duplicate key error code
  });

  it("should not create a recipe with invalid name", async () => {
    const recipe = new Recipe({
      id: 2,
      name: "invalid name",
      ingredients: [],
      instructions: [],
      category: { id: 1 },
    });

    try {
      await recipe.save();
    } catch (err) {
      expect(err).to.exist;
      expect(err.errors.name).to.exist;
      expect(err.errors.name.message).to.equal(
        "Recipe name must start with an uppercase letter and contain only letters, numbers, and the following special characters: - , . '"
      );
    }
  });

  it("should not create a recipe with invalid ingredient id", async () => {
    const recipe = new Recipe({
      id: 3,
      name: "Invalid Ingredient Recipe",
      ingredients: [
        { id: 999, quantity: 1, unit: "tsp" }, // Invalid ingredient id
      ],
      instructions: [],
      category: { id: 1 },
    });

    try {
      await recipe.save();
    } catch (err) {
      expect(err).to.exist;
      expect(err.errors["ingredients.0.id"]).to.exist;
      expect(err.errors["ingredients.0.id"].message).to.equal(
        "Ingredient id does not exist"
      );
    }
  });
});
