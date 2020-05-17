const bodyJsonSchema = {
  type: 'object',
  required: ['host', 'metric', 'value'],
  properties: {
    host: { type: 'string' },
    metric: {
      type: 'string',
      enum: ['ttfb', 'fcp', 'dom_load', 'window_load']
    },
    value: { type: 'number' }
  }
};

module.exports = {
  schema: {
    body: bodyJsonSchema
  }
};
