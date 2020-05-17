const config = require('../../config');
const schema = require('./schema');

async function routes (fastify, options, next) {
  const database = fastify.mongo.db(config.mongo.dbName);
  const collection = database.collection('analytic');
  const getError = (code, msg) => ({ statusCode: code, message: msg });

  fastify.post('/collect', schema, async (request, reply) => {
    const { body } = request;
    body.created_at = new Date();
    try {
      await collection.insertOne(body);
      reply.code(201).send();
    } catch (e) {
      reply.code(500).send(getError(500, 'Something went wrong.'));
    }
  });

  next();
}

module.exports = routes;
