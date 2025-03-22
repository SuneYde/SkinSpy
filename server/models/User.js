const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Subscription = require("./Subscription");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true }, // Ensures lowercase storage
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    balance: { type: Number, default: 0 },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Prevents double-hashing passwords
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Correct password comparison method
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
