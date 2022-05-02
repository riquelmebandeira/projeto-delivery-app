const { Router } = require('express');
const rescue = require('express-rescue');

const productService = require('../Services/productService');
const { utils } = require('../../utils');
const validateJWT = require('../../utils/validateJWT');

async function findAll(_req, res) {
  const sales = await productService.findAll();

  return res.status(utils.HTTP_OK_STATUS).json(sales);
}

const router = Router();

module.exports = router
  .get('/', rescue(validateJWT), rescue(findAll));