const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxy({});

module.exports = (ctx, options, callback) => {
  proxy.web(ctx.req, ctx.res, options, callback);
};
