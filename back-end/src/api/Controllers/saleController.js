const saleService = require('../Services/saleService');
const { utils } = require('../../utils');

async function findAll(_req, res) {
  const sales = await saleService.findAll();

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

async function create(req, res) {
  const { id: userId } = req.user;

  const saleData = { userId, ...req.body };

  const newSale = await saleService.create(saleData);

  return res.status(utils.HTTP_CREATED_STATUS).json(newSale);
}

module.exports = {
  findAll,
  create,
  };