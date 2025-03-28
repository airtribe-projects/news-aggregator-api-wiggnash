import dotenv from "dotenv";
import express from "express";
import startServer from "./config/serverStart.js";

// Routes Import
import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/news", newsRoutes);

startServer(app);

export default app;
