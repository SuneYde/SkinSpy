const AuthService = require("../services/AuthServices");

class AuthController {
  static async registerUser(req, res) {
    try {
      const userData = req.body;

      const registrationResult = await AuthService.registerUser(userData);
      if (registrationResult.error) {
        return res.status(400).json(registrationResult);
      }

      res.cookie("token", registrationResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        user: registrationResult.user,
        message: "User registered and logged in successfully",
      });
    } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async loginUser(req, res) {
    const userData = req.body;
    const response = await AuthService.loginUser(userData);
    if (response.error) {
      return res.status(400).json(response.user);
    }

    res.cookie("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json(response);
  }
  static async checkAuth(req, res) {
    // Pass the user id from the middleware instead of the whole token
    // Fix: use req.user.id instead of req.user._id to match middleware
    const response = await AuthService.checkAuth(req.user.id);
    if (response.error) {
      return res.status(401).json(response);
    }
    res.status(200).json(response);
  }
  static async updateUser(req, res) {
    const userData = req.body;
    // Fix: use req.user.id instead of req.user._id
    const response = await AuthService.updateSettings(req.user.id, userData);
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  }
}

module.exports = AuthController;
