const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const { User } = require('../database/models');
const { ERR_CODES, MESSAGES } = require('./utils');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(ERR_CODES.UNAUTHORIZED).json({ message: MESSAGES.TOKEN_NOT_FOUND });
  }

  try {
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');

    const verified = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email: verified.email } });

    if (!user) {  
      return res
        .status(ERR_CODES.BAD_REQUEST)
        .json({ message: MESSAGES.USER_NOT_FOUND });
    }

    req.user = user.dataValues;

    next();
  } catch (err) {
    return res.status(ERR_CODES.BAD_REQUEST).json({ message: MESSAGES.TOKEN_INVALID });
  }
};