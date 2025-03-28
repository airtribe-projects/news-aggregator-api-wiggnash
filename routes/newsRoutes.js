import express from "express";

// middlwares
// controllers
import { getNews } from "../controllers/newsController.js";
const newsRoutes = express.Router();

newsRoutes.get("/", getNews);

export default newsRoutes;
