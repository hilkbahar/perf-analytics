const fp = require('fastify-plugin');
const { MongoClient } = require('mongodb');

function dbConnector (fastify, options, next) {
  const url = options.url;
  delete options.url;

  MongoClient.connect(url, options).then((db) => {
    fastify.decorate('mongo', db);
    next();
  });
}

module.exports = fp(dbConnector);
