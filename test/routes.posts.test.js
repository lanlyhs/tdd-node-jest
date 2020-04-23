process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../src/db/config');

describe('Routes: posts', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/posts', () => {
    test('Should return array of posts', async () => {
      const res = await chai.request(server).get('/api/v1/posts');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
  });


  describe('GET /api/v1/posts/:id', () => {
    test('Should return single post', async () => {
      const posts = await chai.request(server).get('/api/v1/posts');
      const [ first ] = posts.body.data;
      const res = await chai.request(server).get(`/api/v1/posts/${first.id}`);
      expect(res.status).toEqual(200);
      expect(res.body.data.title).toBeDefined();
    });
  });

  describe('POST /api/v1/posts', () => {
    test('Should return single post after insert', async () => {
      const res = await chai.request(server)
        .post('/api/v1/posts')
        .send({ title: 'Test title', content: 'Test text' });

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
    });

    test('Should return error status, message, when body invalid', async () => {
      const res = await chai.request(server)
        .post('/api/v1/posts')
        .send({ title: '' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/v1/posts', () => {
    test('Should return patched entity', async () => {
      const posts = await chai.request(server).get('/api/v1/posts');
      const [ first ] = posts.body.data;
      const res = await chai.request(server)
        .patch(`/api/v1/posts/${first.id}`)
        .send({ status: true });

      expect(res.status).toEqual(200);
      expect(res.body.data.status).toEqual(true);
    });
  });


  describe('DELETE /api/v1/posts', () => {
    test('Should return patched entity', async () => {
      const posts = await chai.request(server).get('/api/v1/posts');
      const [ first ] = posts.body.data;

      const res = await chai.request(server)
        .delete(`/api/v1/posts/${first.id}`);

      expect(res.status).toEqual(200);
    });
  });


});
