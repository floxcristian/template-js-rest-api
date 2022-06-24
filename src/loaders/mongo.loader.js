// Libs
const mongoose = require('mongoose');
// Constants
const { MONGODB } = require('../config');
const { USERNAME, PASSWORD, HOST, DATABASE } = MONGODB;

const _USERNAME = encodeURI(USERNAME);
const _PASSWORD = encodeURI(PASSWORD);

const MONGODB_URI = `mongodb+srv://${_USERNAME}:${_PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

const init = () => {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoReconnect: true,
    reconnectTries: 10000,
    reconnectInterval: 1000
  });
};

const db = mongoose.connection;
db.on('connected', () => {
  console.log(' [+] Connected succesfully with mongo.');
});
//db.on("error", console.error.bind(console, "connection error with mongo:"));
db.on('error', () => {
  console.log('Connection error with mongo.');
  const { enviarMail } = require('./api/gestionCarro/carro.functions');
  enviarMail(
    'sebastian.aracena@implementos.cl;ricardo.rojas@implementos.cl',
    `[Api Carro ${process.env.AMBIENTE}] Error - Problema en mongo`,
    e.toString()
  );
});

module.exports.MongoLoader = { init };
