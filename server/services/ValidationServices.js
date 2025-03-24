const User = require("../models/User");

class ValidationService {
  static async getValidatedBalance(userid) {
    try {
      const user = await User.findById(userid);
      if (!user) {
        return { error: "User not found" };
      }
      return { balance: Number(user.balance) };
    } catch (error) {
      return { error: error.message };
    }
  }
  static async getValidatedSubscription(userid) {
    try {
      const user = await User.findById(userid).populate("subscription"); // Populate subscription reference
      if (!user) {
        return { error: "User not found" };
      }

      if (!user.subscription || !user.subscription.plan) {
        return { error: "Subscription plan not found" };
      }

      return { subscription: user.subscription.plan };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = ValidationService;
