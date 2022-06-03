const md5 = require('md5');
const { utils } = require('../../utils');
const loginSchema = require('../../Schemas/loginSchema');
const { User } = require('../../database/models');
const { generateToken } = require('../../utils/generateToken');

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
    e.code = 'NOT_FOUND';
    throw e;
  }

  user = user.dataValues;

  const encrypted = md5(password);

  if (user.password !== encrypted) {
    const e = new Error();
    e.message = utils.MESSAGES.CREDENTIALS_INVALID;
    e.code = 'BAD_REQUEST';
    throw e;
  }

  const { password: pwd, ...userInfo } = user;

  return generateToken(userInfo);
}

module.exports = {
  validate,
  login,
};