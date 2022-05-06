const { Router } = require('express');
const rescue = require('express-rescue');

const validateJWT = require('../../utils/validateJWT');
const validateSaleData = require('../Middlewares/validateSaleData');
const { findAll, findOne, create } = require('../Controllers/saleController');

const router = Router();

router.get('/', rescue(validateJWT), rescue(findAll));
router.get('/:id', rescue(validateJWT), rescue(findOne));
router.post('/', rescue(validateJWT), rescue(validateSaleData), rescue(create));

module.exports = router;
