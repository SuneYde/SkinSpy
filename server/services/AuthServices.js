const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const dotenv = require("dotenv");
dotenv.config();

class AuthService {
  static async registerUser(userData) {
    try {
      const { username, email, password } = userData;
      if (!username || !email || !password) {
        return { error: "Please fill in all fields" };
      }
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return { error: "User already exists" };
      }

      const newSubscription = new Subscription({
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      // No need to hash the password here, the User model will do it
      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password, // The pre-save hook in the User model will hash this
        subscription: newSubscription._id,
      });
      const token = jwt.sign(
        { user: { id: newUser.id } },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      await newUser.save();
      await newSubscription.save();
      const success = { success: "User registered successfully" };
      return { token, success };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async loginUser(userData) {
    try {
      const { email, password } = userData;
      console.log("Checking email:", email.toLowerCase()); // Debugging

      const user = await User.findOne({ email: email.toLowerCase() });
      console.log("User found:", user); // Debugging

      if (!user) {
        return { error: "Invalid credentials" };
      }

      // Use the comparePassword method from the user model
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      };
    } catch (error) {
      return { error: error.message };
    }
  }
  static async checkAuth(userId) {
    try {
      const user = await User.findById(userId)
        .select("-password")
        .populate("subscription", "plan startDate endDate");
      if (!user) {
        return { error: "User not found" };
      }
      return { user };
    } catch (error) {
      return { error: "Authentication failed" };
    }
  }
  static async updateSettings(userId, userData) {
    try {
      if (!userData || typeof userData !== "object") {
        return { error: "Invalid data" };
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: userData },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return { error: "User not found" };
      }

      return { success: "User updated" };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = AuthService;
