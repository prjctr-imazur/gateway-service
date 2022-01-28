const configService = require("../services/ConfigService");

module.exports = {
  [configService.environment]: {
    username: configService.database.username,
    password: configService.database.password,
    database: configService.database.database,
    host: configService.database.host,
    dialect: "postgres",
  },
};
