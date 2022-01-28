const { Gateway } = require("../../database/models");

class GatewayController {
  async handle(service) {
    const record = await Gateway.findOne({ where: { service } });

    return record;
  }
}

module.exports = GatewayController;
