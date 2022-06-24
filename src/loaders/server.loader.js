// Libs
const express = require('express');
const cors = require('cors');
const http = require('http');
// Constants
const { HTTP_PORT } = require('../config');

const init = () => {
  return new Promise((resolve, reject) => {
    const { json, urlencoded } = express;
    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));
    // app.use(`/${config.API_PREFIX}`, this.routes);

    const server = http.createServer(app);
    server
      .listen(HTTP_PORT)
      .on('listening', () => {
        const { port } = server.address();
        console.info(`Server is running on port [${port}].`);
        // this.logger.info(`Server is running on port [${port}].`);
        resolve();
      })
      .on('error', error => {
        console.error(`Error on init server.`);
        //this.logger.error(`Error on init server.`);
        reject(error);
      });
    server.setTimeout(600_000);
  });
};

module.exports.ServerLoader = { init };
