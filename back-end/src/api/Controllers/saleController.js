const saleService = require('../Services/saleService');
const { utils } = require('../../utils');

async function findAll(_req, res) {
  const sales = await saleService.findAll();

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

module.exports = { findAll };