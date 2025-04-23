# Express API – RESTful Backend

Welcome to the Express API! This RESTful backend is built with Node.js and Express.js, providing a set of endpoints for managing resources. The API is deployed on Render and is accessible via the following base URL:

**Base URL:** [https://express-api-jbkl.onrender.com](https://express-api-jbkl.onrender.com)

## 📘 API Documentation

For a detailed overview of all available endpoints, request/response schemas, and example usages, please refer to the Swagger UI:

👉 [https://express-api-jbkl.onrender.com/api-docs/](https://express-api-jbkl.onrender.com/api-docs/)

This interactive documentation allows you to test endpoints directly from the browser.

> Try Swagger UI and check [responses](https://gyazo.com/6ccf05919bd5c5b97c299fc444d993c8) for `cURL` command examples

## 🚀 Features

- **RESTful Design:** Follows standard REST principles with clear and consistent endpoint structures.
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations for various resources.
- **JSON Responses:** All endpoints return data in JSON format for easy integration.
- **CORS Enabled:** Cross-Origin Resource Sharing is configured to allow requests from different origins.
- **Error Handling:** Implements comprehensive error handling for robust API interactions.

## 📦 Installation & Setup (Local Development)

To run the API locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ArtemisDava/u05-restapi.git
   cd u05-restapi
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add necessary environment variables:

   ```env
   PORT=5001
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:5001`.

## 🛠️ Deployment on Render

This API is deployed on [Render](https://render.com), a cloud platform for hosting web applications.

## 📬 API Endpoints Overview

Here’s a brief overview of the categories endpoints:

- **`GET` [/api/v1/categories](https://express-api-jbkl.onrender.com/api/v1/categories)** Retrieve a list of categories.
- **`GET` [/api/v1/categories/:categoryID](https://express-api-jbkl.onrender.com/api/v1/categories/2)** Retrieve a specific category by ID.
- **`POST` /api/v1/admin/categories** Create a new category.
- **`PUT` /api/v1/admin/categories/:categoryID** Update an existing category by ID.
- **`DELETE` /v1/admin/categories/:categoryID** Delete a category by ID.

> No middlewares are added yet, these endpoints can be accessed by anyone.

## 🧪 Testing the API

You can test the API endpoints using tools like:

- **Swagger UI:** [https://express-api-jbkl.onrender.com/api-docs/](https://express-api-jbkl.onrender.com/api-docs/)
- **Postman:** Import the API endpoints and test various requests.
- **cURL:** Use command-line tools to send HTTP requests.
