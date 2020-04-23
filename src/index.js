const Koa = require('koa');
const bodyParser = require('koa-body');
const router = require('./routes');

const PORT = process.env.PORT || 8080;

module.exports = new Koa()
  .use(bodyParser())
  .use(router.routes()) // Attach posts entity router
  .listen(PORT, () => console.log(`Simple service listening in port: ${PORT}`));