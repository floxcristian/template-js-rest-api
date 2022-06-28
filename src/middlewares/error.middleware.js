// Libs
const createError = require('http-errors');
const sentry = require('@sentry/node');
sentry.init({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' });

/**
 * Logger para el mensaje de error.
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorLogger = (error, req, res, next) => {
  console.log(`error ${error.message}`);
  next(error); // Calling next middleware
};

/**
 * Lee el mensaje de error y devuelve una respuesta en formato JSON.
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorResponder = (error, req, res, next) => {
  res.header('Content-Type', 'application/json');
  const status = error.status || 400;
  res.status(status).send(error.message);
};

/**
 * Retorna un error 404 para rutas no definidas.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const invalidPathHandler = (req, res, next) => {
  res.status(404);
  res.send('invalid path');
};

/*
// Attach the first Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger)

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder)

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler)*/

const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  console.log(`miau ${error.message}`); // log the error
  const status = error.status || 400;
  // send back an easily understandable error message to the caller
  res.status(status).send(error.message);
  next(error);
};

module.exports = {
  errorHandler
};
