const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../../utils/validateJWT');

const { validate, register, findAll, destroy } = require('../Controllers/userController');

const router = Router();

router.post('/', rescue(validate), rescue(register));
router.get('/', rescue(validateJWT), rescue(findAll));
router.delete('/:id', rescue(validateJWT), rescue(destroy));

module.exports = router;
