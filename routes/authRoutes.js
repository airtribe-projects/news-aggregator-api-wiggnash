import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import validateAuthRouteInput from "../middleware/validateAuth.js";

const authRoutes = express.Router();

/**
 * Registers a new user for the application.
 *
 * This function handles the registration process for new users by taking their username, password, and email as input.
 * It performs necessary validations, such as checking if the username and email are unique.
 * If all validations pass, it securely stores the user's information in the database and sends
 * a confirmation message.
 *
 * @param {Object} req - The request object containing the user's registration details.
 * @param {Object} res - The response object used to send back the confirmation message.
 *
 * @returns {void}
 *
 * @throws {Error} If any of the input parameters are invalid or if the username/email is already taken.
 */

authRoutes.post("/signup", validateAuthRouteInput, async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // check if the user already exists
    const existingUser = await User.findOne({
      username: username,
      email: email,
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, You can login" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /signup", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * Handles user login for the application.
 *
 * This function processes the login request by validating the input fields (username, email, and password).
 * It checks if the user exists in the database and verifies the provided password.
 * If the credentials are valid, it generates a JWT token for the user and sends a success response.
 * If any validation fails, it sends an appropriate error response.
 *
 * @param {Object} req - The request object containing the user's login details.
 * @param {Object} res - The response object used to send back the login status and token.
 *
 * @returns {void}
 *
 * @throws {Error} If any of the input parameters are missing, if the user is not found, or if the password is invalid.
 */

// User login Route
authRoutes.post("/login", validateAuthRouteInput, async (req, res) => {
  const { username, email, password } = req.body;

  // check if the user exists or not
  const query = email ? { email } : { username };
  const existingUser = await User.findOne(query);

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "User not found , Please register" });
  }

  // User is present therefore verify the password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({ message: "Login successful", token });
});

export default authRoutes;
