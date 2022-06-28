module.exports = {
  ...require('./server.loader'),
  ...require('./mongo.loader'),
  ...require('./cron.loader'),
  ...require('./logger.loader')
};
