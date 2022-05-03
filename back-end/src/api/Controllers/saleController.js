const { Router } = require('express');
const rescue = require('express-rescue');

const saleService = require('../Services/saleService');
const { utils } = require('../../utils');
const validateJWT = require('../../utils/validateJWT');

async function findAll(_req, res) {
  const sales = await saleService.findAll();

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

const router = Router();

module.exports = router
  .get('/', rescue(validateJWT), rescue(findAll));
