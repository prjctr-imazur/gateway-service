
require('./bootstrap')

const Koa = require('koa');

const configService = require('./services/ConfigService');
const loggerService = require('./services/LoggerService');
const errorHandler = require('./middleware/errorHandler');
const loggerHandler = require('./middleware/loggerHandler');
const router = require('./routes');

const config = {
  host: configService.host,
  port: configService.port,
};

const app = new Koa();

app.use(errorHandler);

app.use(loggerHandler);

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(config.port, () => {
  loggerService.info(
    `App is listening on http://${config.host}:${config.port}`
  );
});
