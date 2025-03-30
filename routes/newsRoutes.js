import express from "express";

// middlwares
import validateToken from "../middleware/validateToken.js";

// controllers
import { getNews } from "../controllers/newsController.js";
const newsRoutes = express.Router();

newsRoutes.get("/", validateToken, getNews);

export default newsRoutes;
