const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const User = require("../src/models/user.model");
const Ingredient = require("../src/models/ingredient.model");
const Recipe = require("../src/models/recipe.model");
const Category = require("../src/models/category.model");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Model", () => {
  it("should create a new user", async () => {
    const ingredient1 = new Ingredient({ id: 1, name: "Salt" });
    const ingredient2 = new Ingredient({ id: 2, name: "Pepper" });
    await ingredient1.save();
    await ingredient2.save();

    const category1 = new Category({ id: 1, name: "Indian" });
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

    await recipe.save();

    const user = new User({
      email: "test@example.com",
      apiKey: "12345",
      cart: [{ id: 1, quantity: 2, unit: "kg" }],
      favoriteRecipes: [{ id: 1 }],
      allergies: [{ id: 1 }],
    });

    const savedUser = await user.save();
    expect(savedUser.email).to.equal("test@example.com");
    expect(savedUser.apiKey).to.equal("12345");
    expect(savedUser.cart).to.have.lengthOf(1);
    expect(savedUser.allergies).to.have.lengthOf(1);
  });

  it("should not create a user with duplicate email", async () => {
    const user = new User({
      email: "test@example.com",
      apiKey: "67890",
      cart: [],
      favoriteRecipes: [],
      allergies: [],
    });

    try {
      await user.save();
    } catch (err) {
      expect(err).to.exist;
      expect(err.code).to.equal(11000); // Duplicate key error code
    }
  });
});
