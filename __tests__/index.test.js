const fastify = require('fastify');
const wrapFastify = require('../src/index.js');

const methods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'];

describe('fastify wrapper', () => {
  let app;

  beforeAll(() => {
    const wrappedFastify = wrapFastify(fastify);
    app = wrappedFastify({ logger: true });

    methods.forEach((method) => {
      app.route({
        method,
        url: '/',
        handler: (req, reply) => {
          reply.send({ method });
        },
      });
    });
  });

  describe('#should be override', () => {
    test.each([
      ['POST', 'HEAD'],
      ['POST', 'PUT'],
      ['POST', 'DELETE'],
      ['POST', 'OPTIONS'],
      ['POST', 'PATCH'],
    ])('#test from %s to %s', async (methodFrom, methodTo) => {
      const res = await app.inject({
        method: methodFrom,
        url: `/?_method=${methodTo}`,
      });

      const actual = JSON.parse(res.body);
      const expected = { method: methodTo };

      expect(res.statusCode).toBe(200);
      expect(actual).toEqual(expected);
    });
  });

  afterAll(() => {
    app.close();
  });
});
