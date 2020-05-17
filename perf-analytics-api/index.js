const fastify = require('fastify')({ logger: true });
const config = require('./config');

fastify.register(require('fastify-cors'), { origin: '*' });
fastify.decorate('notFound', (request, reply) => {
  reply.code(404).send({ status: 404, error: 'errors.notFound', message: 'Not Found' });
});
fastify.setNotFoundHandler(fastify.notFound);

fastify.register(require('./db-connector'), {
  url: config.mongo.dbUrl,
  useNewUrlParser: true
});
fastify.register(require('./services/collect/index'));
fastify.register(require('./services/stats/index'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(config.server.port, config.server.host, (err) => {
      if (err) throw err;
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
