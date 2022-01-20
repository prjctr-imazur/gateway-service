const Router = require("koa-router");

const configService = require("../../services/ConfigService");
const jwtService = require("../../services/JwtService");
const proxy = require("./proxy");

const router = new Router();

router.post(["/users/login", "/users/register"], async (ctx) => {
  ctx.respond = false;

  const target = configService.userServiceUrl;

  const { method, path } = ctx.request;

  const salt = [method, path].join(":");

  const headers = { "x-private-api-token": jwtService.sign({}, salt) };

  return proxy(ctx.req, ctx.res, { target, headers });
});

module.exports = router;
