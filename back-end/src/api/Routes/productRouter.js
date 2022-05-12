const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../Middlewares/validateJWT');

const { findAll } = require('../Controllers/productController');

const router = Router();

router.get('/', rescue(validateJWT), rescue(findAll));

module.exports = router;
