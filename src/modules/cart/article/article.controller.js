const { articleService } = require('./article.service');

const getSkus = async (req, res) => {
  const { search, visible } = req.query;
  const data = await articleService.getSkus(search, visible);
  return res.json({
    error: false,
    msg: 'OK',
    data
  });
};

const getBrands = async (req, res) => {
  const { visible } = req.query;
  const data = await articleService.getBrands(visible);
  return res.json({
    error: false,
    msg: 'OK',
    data
  });
};

module.exports.articleController = {
  getSkus,
  getBrands
};
