const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const EmailSettings = require("../models/EmailSettings");
const Settings = require("../models/Settings");
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

      const newEmailSettings = new EmailSettings();

      const newSettings = new Settings({
        theme: "dark",
        notifications: true,
        emailSettings: newEmailSettings._id,
      });

      // No need to hash the password here, the User model will do it
      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password, // The pre-save hook in the User model will hash this
        subscription: newSubscription._id,
        settings: newSettings._id,
      });
      const token = jwt.sign(
        { user: { id: newUser.id } },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("Registration token payload:", { user: { id: newUser.id } });

      await newUser.save();
      await newEmailSettings.save();
      await newSubscription.save();
      await newSettings.save();
      return {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      };
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

      console.log("Login token payload:", { user: { id: user.id } });

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
      console.log("Checking auth for user ID:", userId);

      // First get the user
      const user = await User.findById(userId)
        .select("-password")
        .populate("subscription", "plan startDate endDate")
        .populate("settings", "theme language _2fa currency");

      if (!user) {
        console.log("User not found with ID:", userId);
        return { error: "User not found" };
      }

      // If settings has emailSettings, populate that separately
      if (user.settings && user.settings._id) {
        await Settings.populate(user.settings, {
          path: "emailSettings",
          select:
            "MySnipesWeekLimitisAlmostReached MySnipesWeekLimitReached MySessionIsPausedDueToSpendingLimit NewLoginFromUnknownDevice NewFeaturesAndUpdates MyMonthlyTradeSummary",
        });
      } else {
        console.log("Settings or settings ID not found for user", userId);
      }

      return { user };
    } catch (error) {
      console.error("Auth check error:", error);

      // Add more specific error handling for different error types
      if (error.name === "StrictPopulateError") {
        console.log("Handling StrictPopulateError - Schema issue detected");

        // Try to get the basic user data without problematic population
        try {
          const basicUser = await User.findById(userId).select("-password");
          if (basicUser) {
            console.log("Retrieved basic user data as fallback");
            return {
              user: basicUser,
              warning: "Some related data could not be loaded",
            };
          }
        } catch (fallbackError) {
          console.error("Even fallback user retrieval failed:", fallbackError);
        }
      }

      return { error: "Authentication failed", details: error.message };
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
