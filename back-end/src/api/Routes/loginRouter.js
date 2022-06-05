const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../Middlewares/validateJWT');

const { validate, login, authenticate } = require('../Controllers/loginController');

const router = Router();

router.post('/', rescue(validate), rescue(login));

router.post('/authenticate', rescue(validateJWT), rescue(authenticate));

module.exports = router;
