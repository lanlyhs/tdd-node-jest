const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const router = require("./routes");
const PORT = process.env.PORT || 8080;

// error handeling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const message = "Internal server error";
        ctx.status = err.statusCode || 500;
        ctx.body = {
            error: err.data || { message },
        };
    }
});

// error log, centralized error handling
app.on("error", async (err, ctx) => {
    console.error("server error", err, ctx);
});

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

// use koa-body
app.use(koaBody());

// connect router
app.use(router.routes());

const server = app.listen(PORT, () =>
    console.log(`Simple service listening in port: ${PORT}`)
);

module.exports = server;
