const saleService = require('../Services/saleService');
const { utils } = require('../../utils');

async function findAll(req, res) {
  const { id, role } = req.user;

  const sales = role === 'seller' 
  ? await saleService.findAllSeller(id) : await saleService.findAllCustomer(id);

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

async function create(req, res) {
  const { id: userId } = req.user;

  const saleData = { userId, ...req.body };

  const newSale = await saleService.create(saleData);

  return res.status(utils.HTTP_CREATED_STATUS).json(newSale);
}

async function findOne(req, res) {
  const { id } = req.params;

  const sale = await saleService.findOne(id);

  return res.status(utils.HTTP_OK_STATUS).json(sale);
}

async function update(req, res) {
  const { id } = req.params;
  const { role } = req.user;

  const updated = await saleService.update(id, role);

  return res.status(utils.HTTP_OK_STATUS).json(updated);
}

module.exports = {
  findAll,
  create,
  findOne,
  update,
  };
