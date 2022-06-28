// Libs
const express = require('express');
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
// Loaders
const { LoggerLoader } = require('./logger.loader');
// Middlewares
const { errorHandler } = require('../middlewares');
// Constants
const { HTTP_PORT, API } = require('../config');

const init = () => {
  return new Promise((resolve, reject) => {
    const logger = LoggerLoader.initLogger(__filename);
    const { json, urlencoded } = express;
    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.frameguard({ action: 'DENY' }));
    app.use(compression());
    app.use(cors({ origin: '*' }));
    app.use(morgan('tiny'));
    app.use(errorHandler);
    app.use(`/${API.PREFIX}`, require('../routes'));

    // app.use(Sentry.Handlers.requestHandler());
    // app.use(Sentry.Handlers.errorHandler());

    const server = http.createServer(app);
    server
      .listen(HTTP_PORT)
      .on('listening', () => {
        const { port } = server.address();
        logger.info(`Server is running on port [${port}].`);
        resolve();
      })
      .on('error', error => {
        logger.error(`Error on init server.`);
        reject(error);
      });
    server.setTimeout(API.TIMEOUT_RESPONSE);
  });
};

module.exports.ServerLoader = { init };
