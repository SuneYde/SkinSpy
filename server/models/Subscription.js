const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true, default: "Free" },
  price: { type: Number, required: true, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
