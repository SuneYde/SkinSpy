const UserService = require("../services/UserService");

class UserController {
  static async getUsersActiveSkins(req, res) {
    try {
      const user_id = req.user.id;

      if (!user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const response = await UserService.getUsersActiveSkins(user_id);

      if (response.error) {
        return res.status(400).json({ error: response.error });
      }

      return res.json(response);
    } catch (error) {
      console.error("Error fetching user's active skins:", error);
      res.status(500).json({ error: "Error fetching user's active skins" });
    }
  }
}

module.exports = UserController;
