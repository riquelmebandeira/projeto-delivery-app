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

async function findAll(_req, res) {
  const users = await userService.findAll();

  res.status(utils.HTTP_OK_STATUS).json(users);
}

async function findAllSellers(_req, res) {
  const users = await userService.findAllSellers();

  res.status(utils.HTTP_OK_STATUS).json(users);
}

async function destroy(req, res) {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== 'administrator') { 
    return res.status(utils.HTTP_UNAUTHORIZED_STATUS).json(utils.MESSAGES.UNAUTHORIZED_USER); 
  }

  await userService.destroy(id);

  return res.status(utils.HTTP_OK_NO_CONTENT_STATUS).json();
}

module.exports = {
  validate,
  register,
  findAll,
  findAllSellers,
  destroy,
};
