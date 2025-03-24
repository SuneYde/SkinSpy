const express = require("express");
const router = express.Router();
const ValController = require("../controllers/ValidationController");
const authMiddleware = require("../middleware/authMiddleware");
const balanceLimiter = require("../middleware/balanceLimiter");

router.get(
  "/validated-balance",
  balanceLimiter,
  authMiddleware,
  ValController.validatedBalance
);

router.get(
  "/validated-subscription",
  authMiddleware,
  ValController.validatedSubscription
);

module.exports = router;
