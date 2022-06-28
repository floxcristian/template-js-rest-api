const express = require('express');
const app = express();

app.use('/cart', require('./modules/cart/cart.route'));

module.exports = app;
