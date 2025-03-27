import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API",
      version: "1.0.0",
      description:
        "A REST API for managing recipes, ingredients, and categories",
    },
    servers: [
      {
        url: "http://localhost:5001/api/",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Categories",
        description: "Endpoints for managing categories",
      },
      {
        name: "Recipes",
        description: "Endpoints for managing recipes",
      },
      {
        name: "Ingredients",
        description: "Endpoints for managing ingredients",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Desserts",
              description:"The name of the category (must be unique and start with an uppercase letter)",
            },
            description: {
              type: "string",
              example: "Sweet treats and desserts",
              description:"A brief description of the category",
            },
            image: {
              type: "string",
              example: "https://example.com/desserts.jpg",
              description:"A URL to an image for the category",
            },
          },
          // required:["name"],
        },
        Ingredient: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "string - unique and required",
            },
            image: {
              type: "string",
              example:
                "must end with one of the following extensions: png, jpg, jpeg, gif, svg",
            },
          },
        },
        Recipe: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "string - unique and required",
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ingredient: {
                    type: "string",
                  },
                  quantity: {
                    type: "number",
                  },
                  unit: {
                    type: "string",
                  },
                },
              },
            },
            alternatives: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ingredient: {
                    type: "string",
                  },
                  quantity: {
                    type: "number",
                  },
                  unit: {
                    type: "string",
                  },
                },
              },
            },
            instructions: {
              type: "array",
              items: {
                type: "string",
              },
            },
            category: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUI };
