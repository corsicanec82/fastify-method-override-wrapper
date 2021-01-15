const parseurl = require('parseurl');

const allowedMethods = ['HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'];

const overrideMethod = (req) => {
  const originalUrl = req.url;
  const originalMethod = req.method.toUpperCase();

  if (originalMethod === 'POST') {
    const url = parseurl(req);
    const searchParams = new URLSearchParams(url.query);
    const queryMethod = searchParams.get('_method');
    const method = queryMethod && queryMethod.toUpperCase();
    if (method && allowedMethods.includes(method)) {
      req.method = method;
    }
  }

  return originalUrl;
};

const wrapFastify = (fastify) => (fastifyOptions = {}) => fastify({
  ...fastifyOptions,
  rewriteUrl: (req) => {
    const { rewriteUrl } = fastifyOptions;
    const originalUrl = overrideMethod(req);
    return rewriteUrl ? rewriteUrl(req) : originalUrl;
  },
});

module.exports = wrapFastify;
