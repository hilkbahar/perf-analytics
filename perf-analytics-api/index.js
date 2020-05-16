// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

const config = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3002
  }
};

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

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
