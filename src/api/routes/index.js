const Router = require("koa-router");

const loggerService = require("../../services/LoggerService");
const GatewayController = require("../controllers/GatewayController");
const proxy = require("../proxy");
const { discoverServiceName } = require("../helpers");

const router = new Router();

router.all("/(.*)", async (ctx) => {
  ctx.respond = false;

  const controller = new GatewayController();

  const serviceName = discoverServiceName(ctx.request.path);

  const service = await controller.handle(serviceName);

  if (service) {
    const options = {
      target: service.url,
      headers: { "x-private-api-token": service.token },
    };

    return proxy(ctx, options, () => {
      loggerService.error(`Couldn't connect to the ${options.target}`);

      ctx.res.writeHead(502);

      ctx.res.end(
        JSON.stringify({
          error: `Couldn't connect to the external service`,
        })
      );
    });
  }

  ctx.res.writeHead(404);

  ctx.res.end(
    JSON.stringify({
      error: `Couldn't find requested service`,
    })
  );
});

module.exports = router;
