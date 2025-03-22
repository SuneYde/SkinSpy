const AuthService = require("../services/AuthServices");

class AuthController {
  static async registerUser(req, res) {
    const userData = req.body;
    const response = await AuthService.registerUser(userData);
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(201).json(response);
  }
  static async loginUser(req, res) {
    const userData = req.body;
    const response = await AuthService.loginUser(userData);
    if (response.error) {
      return res.status(400).json(response);
    }
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
