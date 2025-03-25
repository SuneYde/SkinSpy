const MonitorService = require("../services/MonitorService");

class MonitorController {
  static async sendMonitorData(req, res) {
    const user_id = req.user.id;
    const { totalBalanceUsed, SkinsBeingMonitored } = req.body;
    if (!user_id || !totalBalanceUsed || !SkinsBeingMonitored) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await MonitorService.sendMonitorData(
      user_id,
      totalBalanceUsed,
      SkinsBeingMonitored
    );

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }

    return res.json({ message: response.message });
  }

  static async stopMonitoringSession(req, res) {
    const user_id = req.user.id;
    if (!user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await MonitorService.stopMonitoringSession(user_id);

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }

    return res.json({ message: response.message });
  }
  static async getActiveSessions(req, res) {
    const response = await MonitorService.getActiveSessions();

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }

    return res.json({ activeSessions: response.activeSessions });
  }

  static async getActiveSkins(req, res) {
    const response = await MonitorService.getActiveSkins();

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }

    return res.json(response);
  }
}

module.exports = MonitorController;
