const Router = require('koa-router');
const { List, View, Create, Patch, Delete } = require('../controllers/post');

module.exports = new Router()
  .get('/', List)
  .get('/:id', View)
  .post('/', Create)
  .patch('/:id', Patch)
  .delete('/:id', Delete);