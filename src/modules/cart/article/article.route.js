const express = require('express');
const { articleController } = require('./article.controller');

const router = express.Router();

router.get('/sku', articleController.getSkus);
router.get('/brand', articleController.getBrands);

module.exports = router;
