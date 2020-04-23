const Router = require("koa-router");
const posts = require("./posts");
const router = new Router();
const api = new Router();
const v1 = new Router();

v1.use("/posts", posts.routes())
api.use("/v1", v1.routes());
router.use("/api", api.routes());

module.exports = router;