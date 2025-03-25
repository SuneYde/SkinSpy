const validationService = require("../services/ValidationServices");

class ValidationController {
  static async validatedBalance(req, res) {
    const response = await validationService.getValidatedBalance(req.user.id);
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  }

  static async validatedSubscription(req, res) {
    const response = await validationService.getValidatedSubscription(
      req.user.id
    );
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  }

  static async validateOrder(req, res) {
    const response = await validationService.validateOrder(
      req.user.id,
      req.body.order
    );
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  }
}

module.exports = ValidationController;
