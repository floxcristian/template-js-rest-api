// Libs
const mongoose = require('mongoose');
const sentry = require('@sentry/node');
// Loaders
const { LoggerLoader } = require('./logger.loader');
// Constants
const { MONGODB } = require('../config');
const { USERNAME, PASSWORD, HOST, DATABASE, PORT } = MONGODB;

const init = async () => {
  const logger = LoggerLoader.initLogger(__filename);
  const db = mongoose.connection;
  db.on('connected', () => {
    logger.info(`Connected succesfully with mongo [${HOST}:${PORT}/${DATABASE}].`);
  });
  db.on('error', error => {
    logger.error(`Connection error [${error.code}] with mongo.`);
    if (sentry) {
      sentry.captureException(error);
    }
    // const { enviarMail } = require('./api/gestionCarro/carro.functions');
    /*enviarMail(
      'sebastian.aracena@implementos.cl;ricardo.rojas@implementos.cl',
      `[Api Carro ${process.env.AMBIENTE}] Error - Problema en mongo`,
      e.toString()
    );*/
  });

  try {
    const _USERNAME = encodeURI(USERNAME);
    const _PASSWORD = encodeURI(PASSWORD);
    const MONGODB_URI = `mongodb://${_USERNAME}:${_PASSWORD}@${HOST}:${PORT}/${DATABASE}?retryWrites=true&w=majority`;
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true
      // useFindAndModify: false
      // autoReconnect: true,
      // reconnectTries: 10000,
      // reconnectInterval: 1000
    });
  } catch (error) {
    logger.error(`Connection error [${error.code}] with mongo.`);
    if (error.code === `ERR_INVALID_URL`) logger.error(`Check mongo connection params or vpn connection.`);
    throw error;
  }
};

module.exports.MongoLoader = { init };
