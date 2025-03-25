const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const joi = require("joi");
dotenv.config();

const tokenSchema = joi.object({
  user: joi
    .object({
      id: joi.string().required(),
    })
    .required(),
  iat: joi.number().required(),
  exp: joi.number().required(),
});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  // Check if no token
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { error, value } = tokenSchema.validate(decoded);
    if (error) {
      console.error("Invalid JWT payload:", error.details);
      return res.status(401).json({ error: "Invalid token structure" });
    }

    req.user = value.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
