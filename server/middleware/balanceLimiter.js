const rateLimit = require("express-rate-limit");

const balanceLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    "Too many requests to validated balance, please try again in 15 minutes",
});

module.exports = balanceLimiter;
