const express = require("express");
const router = express.Router();
const MonitorController = require("../controllers/MonitorController");
const authMiddleware = require("../middleware/authMiddleware");
const checkBot = require("../middleware/checkBot");

router.post(
  "/send-monitor-data",
  authMiddleware,
  MonitorController.sendMonitorData
);

router.post(
  "/stop-monitoring-session",
  authMiddleware,
  MonitorController.stopMonitoringSession
);

router.get(
  "/get-active-sessions",
  checkBot,
  MonitorController.getActiveSessions
);

router.get("/get-active-skins", checkBot, MonitorController.getActiveSkins);

module.exports = router;
