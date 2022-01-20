require("./bootstrap");

const Koa = require("koa");

const passportService = require("./services/PassportService");
const configService = require("./services/ConfigService");
const loggerService = require("./services/LoggerService");
const errorHandler = require("./middleware/errorHandler");
const loggerHandler = require("./middleware/loggerHandler");
const router = require("./api/routes");

const config = {
  host: configService.host,
  port: configService.port,
};

const app = new Koa();

app.use(errorHandler);

app.use(loggerHandler);

app.use(passportService.initialize());

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(config.port, () => {
  loggerService.info(
    `App is listening on http://${config.host}:${config.port}`
  );
});
