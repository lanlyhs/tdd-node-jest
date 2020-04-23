const Router = require("koa-router");
const posts = require("./posts");
const router = new Router();

router.use("/posts", posts.routes());

module.exports = router;