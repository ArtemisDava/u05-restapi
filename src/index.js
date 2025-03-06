import app from "./app.js";
// import { connectDB } from "./database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;


// while fixing controllers, I had to comment out the connectDB function
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/v1/categories`);
});

// const start = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// start();
