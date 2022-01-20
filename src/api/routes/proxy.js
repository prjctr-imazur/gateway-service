const httpProxy = require("http-proxy");

const loggerService = require("../../services/LoggerService");

const proxy = httpProxy.createProxy({});

module.exports = (ctx, options) => {
  return proxy.web(ctx.req, ctx.res, options, () => {
    loggerService.error(`Couldn't connect to the ${target}`);

    ctx.res.writeHead(502);

    ctx.res.end(
      JSON.stringify({
        errors: `Couldn't connect to the external service`,
      })
    );
  });
};
