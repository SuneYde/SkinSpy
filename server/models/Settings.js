const monngoose = require("mongoose");
const EmailSettings = require("./EmailSettings");

const settingsSchema = new monngoose.Schema({
  theme: { type: String, default: "" },
  language: { type: String, default: "eng" },
  emailSettings: {
    type: monngoose.Schema.Types.ObjectId,
    ref: "EmailSettings",
  },
  _2fa: { type: Boolean, default: false },
  currency: { type: String, default: "USD" },
});

module.exports = monngoose.model("Settings", settingsSchema);
