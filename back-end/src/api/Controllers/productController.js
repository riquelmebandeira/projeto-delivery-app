const productService = require('../Services/productService');
const { utils } = require('../../utils');

async function findAll(_req, res) {
  const sales = await productService.findAll();

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

module.exports = { findAll };