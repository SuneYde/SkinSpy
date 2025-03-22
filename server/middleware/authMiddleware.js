const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if no token
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded contains the expected user id structure
    if (!decoded.user || !decoded.user.id) {
      console.error("Token missing user or user.id in payload:", decoded);
      return res.status(401).json({ error: "Invalid token structure" });
    }

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
