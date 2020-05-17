const queryBodyJsonSchema = {
  type: 'object',
  required: ['host'],
  properties: {
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    limit: { type: 'number' },
    host: { type: 'string' }
  }
};

module.exports = {
  query: {
    schema: {
      body: queryBodyJsonSchema
    }
  }
};
