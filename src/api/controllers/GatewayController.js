const { Gateway } = require("../../database/models");

class GatewayController {
  async handle(service) {
    return Gateway.findOne({ where: { service } });
  }
}

module.exports = GatewayController;
