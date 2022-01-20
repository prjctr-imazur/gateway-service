const Router = require("koa-router");
const private = require("./private");
const public = require("./public");

const router = new Router();

router.use(public.routes(), public.allowedMethods());

router.use(private.routes(), private.allowedMethods());

module.exports = router;
