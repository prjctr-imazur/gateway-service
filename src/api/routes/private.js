const Router = require("koa-router");
const configService = require("../../services/ConfigService");
const passportService = require("../../services/PassportService");
const loggerService = require("../../services/LoggerService");
const jwtService = require("../../services/JwtService");

const proxy = require("./proxy");

const router = new Router();

router.all(
  ["/history(.*)", "/subscriptions(.*)", "/users(.*)", "/videos(.*)"],
  passportService.authenticate("jwt", { session: false }),
  async (ctx) => {
    ctx.respond = false;

    const target = match(ctx.request.path);

    if (target) {
      const { method, path } = ctx.request;

      const salt = [method, path].join(":");

      const headers = { "x-private-api-token": jwtService.sign({}, salt) };

      return proxy(ctx, { target, headers });
    }

    ctx.res.writeHead(404);

    ctx.res.end(
      JSON.stringify({
        errors: `Couldn't find requested service`,
      })
    );
  }
);

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
