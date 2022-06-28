const express = require('express');
const app = express();

app.use('/article', require('./article/article.route'));

module.exports = app;
