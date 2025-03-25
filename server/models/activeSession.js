const mongoose = require("mongoose");

const activeSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalBalanceUsed: {
      type: Number,
      required: true,
    },
    SkinsBeingMonitored: {
      type: [
        {
          skin: {
            type: String,
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
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const ActiveSession = mongoose.model("ActiveSession", activeSessionSchema);

module.exports = ActiveSession;
