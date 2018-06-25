const path = require('path');

module.exports = {
  url: process.env.DATABASE_URL,
  modelsPath: path.resolve('app', 'models'),
  options: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 30,
    keepAlive: true,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
    numberOfRetries: 20,
  },
};
