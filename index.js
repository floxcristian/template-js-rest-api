const { ServerLoader, MongoLoader } = require('./src/loaders');

const start = async () => {
  try {
    await Promise.all([ServerLoader.init()]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
