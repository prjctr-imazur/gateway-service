const httpProxy = require("http-proxy");
const Router = require("koa-router");
const configService = require("./services/ConfigService");
const loggerService = require("./services/LoggerService");

const router = new Router();

const proxy = httpProxy.createProxy({});

router.all("/(.*)", async (ctx) => {
  ctx.respond = false;

  const target = match(ctx.request.path);

  if (target) {
    return proxy.web(ctx.req, ctx.res, { target }, () => {
      loggerService.error(`Couldn't connect to the ${target}`);

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

function match(path) {
  if (!path) {
    return "";
  } else if (path.startsWith("/videos")) {
    return configService.videoServiceUrl;
  } else if (path.startsWith("/users")) {
    return configService.userServiceUrl;
  } else if (path.startsWith("/history")) {
    return configService.historyServiceUrl;
  } else if (path.startsWith("/subscriptions")) {
    return configService.subscriptionServiceUrl;
  }
  return "";
}

module.exports = router;
