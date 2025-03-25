const mongoose = require("mongoose");

const activeSkinSchema = new mongoose.Schema({
  weapon: {
    type: String,
    required: true,
  },
  users_in_queue: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        maxFloat: {
          type: Number,
          required: true,
        },
        minFloat: {
          type: Number,
          required: true,
        },
        maxPrice: {
          type: Number,
          required: true,
        },
        pattern: {
          type: String,
          default: "",
        },
        position_in_queue: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const ActiveSkin = mongoose.model("ActiveSkin", activeSkinSchema);

module.exports = ActiveSkin;
