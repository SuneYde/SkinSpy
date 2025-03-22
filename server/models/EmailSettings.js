const mongoose = require("mongoose");

const emailSettingsSchema = new mongoose.Schema({
  MySnipesWeekLimitisAlmostReached: {
    type: Boolean,
    required: true,
    default: true,
  },
  MySnipesWeekLimitReached: {
    type: Boolean,
    required: true,
    default: true,
  },
  MySessionIsPausedDueToSpendingLimit: {
    type: Boolean,
    required: true,
    default: true,
  },
  NewLoginFromUnknownDevice: {
    type: Boolean,
    required: true,
    default: true,
  },
  NewFeaturesAndUpdates: {
    type: Boolean,
    required: true,
    default: true,
  },
  MyMonthlyTradeSummary: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("EmailSettings", emailSettingsSchema);
