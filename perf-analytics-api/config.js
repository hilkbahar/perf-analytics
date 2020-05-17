module.exports = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3002
  },
  mongo: {
    dbName: 'perfAnalytics',
    dbUrl: `mongodb://${process.env.DB_HOST || 'localhost'}:27017`
  }
};
