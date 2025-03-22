const PaymentServices = require("../services/PaymentServices");

class PaymentController {
  static async registerCard(req, res) {
    const cardData = req.body;
    const userId = req.user._id;
    const response = await PaymentServices.registerCard(cardData, userId);
    if (response.error) {
      return res.status(400).json(response);
    }
    res.status(201).json(response);
  }
}

module.exports = PaymentController;
