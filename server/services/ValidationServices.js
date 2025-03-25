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

  static async validateOrder(userid, order) {
    try {
      // Fetch user
      const user = await User.findById(userid);
      if (!user) {
        return { error: "User not found" };
      }

      // Validate order is an array of objects with required properties
      if (
        !Array.isArray(order) ||
        !order.every(
          (item) =>
            typeof item.maxFloat === "number" &&
            typeof item.minFloat === "number" &&
            typeof item.maxPrice === "number" &&
            typeof item.pattern === "string" &&
            typeof item.skin === "string"
        )
      ) {
        return { error: "Invalid order format or missing properties" };
      }

      // Calculate total cost
      const totalValue = order.reduce((acc, item) => acc + item.maxPrice, 0);

      const feePercentage = 0.05;
      const serviceFee = totalValue * feePercentage;
      const totalWithFee = totalValue + serviceFee;

      // Fetch validated balance
      const userBalanceResponse = await this.getValidatedBalance(userid);

      if (userBalanceResponse.error) {
        return { error: userBalanceResponse.error };
      }

      const userBalance = userBalanceResponse.balance;

      if (typeof userBalance !== "number") {
        return { error: "Failed to retrieve user balance" };
      }

      // Check if user can afford the order
      if (userBalance < totalWithFee) {
        console.warn(
          `Order failed: User ${
            user.email
          } attempted to purchase items worth ${totalWithFee} with ${userBalance} at ${new Date().toISOString()}`
        );
        return { error: "Insufficient balance" };
      }

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = ValidationService;
