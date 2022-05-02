const { Router } = require('express');
const rescue = require('express-rescue');

const userService = require('../Services/userService');
const { utils } = require('../../utils');

async function validate(req, __res, next) {
  const registrationInfo = req.body;
  await userService.validate(registrationInfo);
  return next();
}

async function register(req, res) {
  const registrationInfo = req.body;

  const token = await userService.register(registrationInfo);
  return res.status(utils.HTTP_CREATED_STATUS).json({ token }).end();
}

const router = Router();

module.exports = router
  .post('/', rescue(validate), rescue(register));
