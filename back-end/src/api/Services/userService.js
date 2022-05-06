const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { utils } = require('../../utils');
const registerSchema = require('../../Schemas/registerSchema');
const { User } = require('../../database/models');

function validate(registrationInfo) {
  const { error } = registerSchema.validate(registrationInfo);
  
  if (error) {
    const e = new Error();
    e.code = error.details[0].type;
    e.message = error.details[0].message;
    throw e;
  }

  return registrationInfo;
}

async function register({ name, email, password: pwd }) {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const e = new Error();
    e.message = utils.MESSAGES.USER_ALREADY_EXISTS;
    e.code = 'CONFLICT';
    throw e;
  }

  const encryptedPwd = md5(pwd);

  const createdUser = await User.create({ name, email, password: encryptedPwd, role: 'customer' });

  const { password, ...userInfo } = createdUser.dataValues;

  return jwt.sign(userInfo, utils.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

async function findAll() {
  const users = await User.findAll();

  const usersWithoutPwd = users.map((user) => {
    const { password, ...data } = user.dataValues;
    return data;
  });

  return usersWithoutPwd;
}

async function destroy(id) {
  return User.destroy({ where: { id } });
}

module.exports = {
  validate,
  register,
  findAll,
  destroy,
};