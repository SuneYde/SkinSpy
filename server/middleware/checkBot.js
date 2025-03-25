const dotenv = require("dotenv");
dotenv.config();

const BOT_API_KEY = process.env.BOT_API_KEY;

const checkBot = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === BOT_API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkBot;
