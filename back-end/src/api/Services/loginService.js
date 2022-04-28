const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { utils } = require('../../utils');
const loginSchema = require('../../Schemas/loginSchema');
const { User } = require('../../database/models');

async function validate(loginInfo) {
  const { error } = await loginSchema.validate(loginInfo);
  
  if (error) {
    const e = new Error();
    e.code = error.details[0].type;
    e.message = error.details[0].message;
    throw e;
  }

  return loginInfo;
}

async function login({ email, password }) {
  let user = await User.findOne({ where: { email } });

  if (!user) {
    const e = new Error();
    e.message = utils.MESSAGES.USER_NOT_EXISTS;
    e.code = 'BAD_REQUEST';
    throw e;
  }

  user = user.dataValues;

  const encrypted = md5(password);

  console.log(encrypted);

  if (user.password !== encrypted) {
    const e = new Error();
    e.message = utils.MESSAGES.CREDENTIALS_INVALID;
    e.code = 'BAD_REQUEST';
    throw e;
  }

  console.log(utils.JWT_SECRET);

  return jwt.sign(user, utils.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

module.exports = {
  validate,
  login,
};