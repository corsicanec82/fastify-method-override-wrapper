const allowedMethods = ['HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'];

const overrideMethod = (req) => {
  const originalUrl = req.url;
  const originalMethod = req.method.toUpperCase();

  if (originalMethod === 'POST') {
    const base = req.headers.origin;
    const url = new URL(originalUrl, `http://${base}`);
    const queryMethod = url.searchParams.get('_method');
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
