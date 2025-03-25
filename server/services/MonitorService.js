const User = require("../models/User");
const ActiveSession = require("../models/activeSession");
const ActiveSkin = require("../models/activeSkin");

class MonitorService {
  static async sendMonitorData(user_id, totalBalanceUsed, SkinsBeingMonitored) {
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return { error: "User not found" };
      }

      const usersActiveSessions = await ActiveSession.find({ user: user_id });
      if (usersActiveSessions.length > 0) {
        return { error: "User already has an active session" };
      }

      for (const skinObj of SkinsBeingMonitored) {
        const { skin, maxFloat, minFloat, maxPrice, pattern } = skinObj;
        let weapon = skin; // ✅ Now correctly assigns `skin` value to `weapon`

        // Check if this weapon already exists in ActiveSkin
        let activeSkinData = await ActiveSkin.findOne({ weapon });

        if (!activeSkinData) {
          // Create a new ActiveSkin entry if the weapon is not found
          activeSkinData = new ActiveSkin({
            weapon,
            users_in_queue: [
              {
                user: user_id,
                maxFloat,
                minFloat,
                maxPrice,
                pattern,
                position_in_queue: 1, // First in queue
              },
            ],
          });

          await activeSkinData.save();
        } else {
          // Check if the user is already monitoring this weapon
          const userExists = activeSkinData.users_in_queue.some(
            (queue) => queue.user.toString() === user_id
          );

          if (!userExists) {
            // Push the new user into the queue safely
            await ActiveSkin.updateOne(
              { weapon },
              {
                $push: {
                  users_in_queue: {
                    user: user_id,
                    maxFloat,
                    minFloat,
                    maxPrice,
                    pattern,
                    position_in_queue: activeSkinData.users_in_queue.length + 1,
                  },
                },
              }
            );
          }
        }
      }

      // Update the user's balance after adding skins to the monitor
      await this.updateBalance(user_id, totalBalanceUsed);

      // Create a new ActiveSession for the user
      const newSession = new ActiveSession({
        user: user_id,
        totalBalanceUsed,
        SkinsBeingMonitored,
      });

      await newSession.save();
      return { message: "Monitor data sent successfully" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updateBalance(user_id, totalBalanceUsed) {
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return { error: "User not found" };
      }

      user.balance -= totalBalanceUsed;

      if (user.balance < 0) {
        return { error: "Insufficient balance" };
      }

      await user.save();
      return { message: "Balance updated successfully" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async stopMonitoringSession(user_id) {
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return { error: "User not found" };
      }

      const usersActiveSessions = await ActiveSession.find({ user: user_id });
      if (usersActiveSessions.length === 0) {
        return { error: "User does not have an active session" };
      }

      const balanceUsed = usersActiveSessions[0].totalBalanceUsed;
      user.balance += balanceUsed;
      await user.save();
      await ActiveSession.deleteMany({ user: user_id });
      return { message: "Monitoring session stopped successfully" };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getActiveSessions() {
    try {
      const activeSessions = await ActiveSession.find();
      return activeSessions;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getActiveSkins() {
    try {
      const activeSkins = await ActiveSkin.find();
      console.log(activeSkins);
      return activeSkins;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = MonitorService;
