require("dotenv-defaults").config();
const packageJson = require("../../package.json");

class ConfigService {
  get name() {
    return packageJson.name;
  }

  get version() {
    return packageJson.version;
  }

  get environment() {
    return process.env.NODE_ENV || "development";
  }

  get host() {
    return process.env.HOST;
  }

  get port() {
    return process.env.PORT;
  }

  get logLevel() {
    return process.env.LOG_LEVEL;
  }

  get videoServiceUrl() {
    return process.env.VIDEO_SERVICE_URL;
  }

  get historyServiceUrl() {
    return process.env.HISTORY_SERVICE_URL;
  }

  get subscriptionServiceUrl() {
    return process.env.SUBSCRIPTION_SERVICE_URL;
  }

  get userServiceUrl() {
    return process.env.USER_SERVICE_URL;
  }
}

const configService = (function loadConfigService() {
  return new ConfigService();
  // eslint-disable-next-line prettier/prettier
})();

module.exports = configService;
