// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Route to register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate and send a token upon successful registration
    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the entered password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate and send a token upon successful login
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
};

module.exports = router;
