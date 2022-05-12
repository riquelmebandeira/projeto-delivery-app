const { Router } = require('express');
const rescue = require('express-rescue');

const validateJWT = require('../Middlewares/validateJWT');
const validateSaleData = require('../Middlewares/validateSaleData');
const { findAll, findOne, create, update } = require('../Controllers/saleController');

const router = Router();

router.get('/', rescue(validateJWT), rescue(findAll));
router.get('/:id', rescue(validateJWT), rescue(findOne));
router.post('/', rescue(validateJWT), rescue(validateSaleData), rescue(create));
router.put('/:id', rescue(validateJWT), rescue(update));

module.exports = router;
