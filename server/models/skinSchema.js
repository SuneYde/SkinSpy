const mongoose = require("mongoose");

const skinSchema = new mongoose.Schema(
  {
    collection: String,
    skin: String,
    rarity: String,
    wear_prices: Object,
    last_updated: Number,
  },
  { collection: "skin-dataset" } // Explicitly set the collection name
);

module.exports = mongoose.model("Skin", skinSchema);
