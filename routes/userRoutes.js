import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import validateAuthRouteInput from "../middleware/validateAuth.js";
import validateToken from "../middleware/validateToken.js";
import {
  registerUser,
  loginUser,
  getUserPreferences,
  updateUserPreferences,
} from "../controllers/userController.js";
const userRoutes = express.Router();

// User registration Route
userRoutes.post("/signup", validateAuthRouteInput, registerUser);

// User login Route
userRoutes.post("/login", validateAuthRouteInput, loginUser);

// Define a route to handle GET requests for user preferences
userRoutes.get("/preferences", validateToken, getUserPreferences);

// Define a route to handle PUT requests for the user preferences
userRoutes.put("/preferences", validateToken, updateUserPreferences);

export default userRoutes;
