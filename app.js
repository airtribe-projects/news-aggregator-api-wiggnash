import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", authRoutes);

const startServer = async () => {
  try {
    // Initialize the database connection before the server starts
    await connectDb();
    app.listen(PORT, (err) => {
      if (err) {
        return console.log("Something bad happened", err);
      }
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
