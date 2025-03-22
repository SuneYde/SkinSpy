const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", AuthController.registerUser);

// Login route
router.post("/login", AuthController.loginUser);

// Check auth route - protected by middleware
router.get("/check", authMiddleware, AuthController.checkAuth);

router.patch("/update", authMiddleware, AuthController.updateUser);

module.exports = router;
