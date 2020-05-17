const dayjs = require('dayjs');
const { ObjectId } = require('mongodb');
const config = require('../../config');
const { query } = require('./schema');

async function routes (fastify, options, next) {
  const database = fastify.mongo.db(config.mongo.dbName);
  const collection = database.collection('analytic');

  fastify.get('/stats/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const result = await collection.findOne({ _id: ObjectId(id) });
      if (!result) {
        fastify.notFound(request, reply);
      }
      reply.code(200).send(result);
    } catch (e) {
      fastify.notFound(request, reply);
    }
  });

  fastify.post('/stats/_query', query, async (request, reply) => {
    const { body } = request;
    const { host, start_date: sDate, end_date: eDate, metric } = body;
    let limit = Number(request.query.limit);
    const query = {
      host,
      ...!!metric && { metric },
      ...(sDate || eDate) && {
        created_at: {
          ...!!sDate && {
            $gte: dayjs(sDate).toISOString()
          },
          ...!!eDate && {
            $gte: dayjs(eDate).toISOString()
          }
        }
      }
    };
    if (!limit || limit > 10) {
      limit = 10;
    }
    try {
      const cursor = await collection.find(query);
      const count = await cursor.count();
      if (limit > 0) {
        cursor.limit(limit);
      }
      cursor.sort({ _id: -1 });
      const items = await cursor.toArray();
      reply.code(200).send({
        count,
        items
      });
    } catch (e) {
      fastify.notFound(request, reply);
    }
  });

  next();
}

module.exports = routes;
