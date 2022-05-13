const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../Middlewares/validateJWT');

const { validate, register, findAll,
  destroy, findAllSellers } = require('../Controllers/userController');

const router = Router();

router.post('/', rescue(validate), rescue(register));
router.post('/admin', rescue(validateJWT), rescue(validate), rescue(register));
router.get('/', rescue(validateJWT), rescue(findAll));
router.get('/sellers', rescue(validateJWT), rescue(findAllSellers));
router.delete('/:id', rescue(validateJWT), rescue(destroy));

module.exports = router;
