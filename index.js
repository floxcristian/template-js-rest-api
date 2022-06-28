const { ServerLoader, MongoLoader, LoggerLoader } = require('./src/loaders');

const start = async () => {
  const logger = LoggerLoader.initLogger(__filename);
  try {
    await Promise.all([ServerLoader.init(), MongoLoader.init()]);
    logger.info(`================== All loaders passed. ==================`);
  } catch (error) {
    logger.error(error);
    setTimeout(() => {
      logger.info(`This app was closed.`);
      process.exit(1);
    }, 1000);
  }
};

start();
