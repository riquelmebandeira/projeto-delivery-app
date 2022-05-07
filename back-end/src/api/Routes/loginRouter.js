const { Router } = require('express');
const rescue = require('express-rescue');

const { validate, login } = require('../Controllers/loginController');

const router = Router();

router.post('/', rescue(validate), rescue(login));

module.exports = router;
