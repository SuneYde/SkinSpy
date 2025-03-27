const mongoose = require("mongoose");
const ActiveSkins = require("../models/activeSkin");

class UserService {
  static async getUsersActiveSkins(userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid ObjectId format:", userId);
        return [];
      }

      const objectId = new mongoose.Types.ObjectId(userId);

      // Corrected query: no .$oid
      const skins = await ActiveSkins.find({
        "users_in_queue.user": objectId,
      });

      if (!skins.length) {
        console.warn("No active skins found for user:", userId);
      }

      // Filter to only return user's entry in the queue
      const filteredSkins = skins.map((skin) => {
        const userEntry = skin.users_in_queue.find(
          (user) => user.user.toString() === userId
        );
        return {
          _id: skin._id,
          weapon: skin.weapon,
          users_in_queue: userEntry ? [userEntry] : [],
          __v: skin.__v,
        };
      });

      return filteredSkins;
    } catch (error) {
      console.error("Error fetching user's active skins:", error);
      throw error;
    }
  }
}

module.exports = UserService;
