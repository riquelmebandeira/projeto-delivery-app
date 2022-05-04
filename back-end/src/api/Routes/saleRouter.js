const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../../utils/validateJWT');

const { findAll } = require('../Controllers/saleController');

const router = Router();

router.get('/', rescue(validateJWT), rescue(findAll));

module.exports = router;
