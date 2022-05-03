const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { utils } = require('./index');
const { ERR_CODES, MESSAGES } = require('./utils');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(ERR_CODES.UNAUTHORIZED).json({ message: MESSAGES.TOKEN_NOT_FOUND });
  }

  try {
    const verified = jwt.verify(token, utils.JWT_SECRET);

    const { email } = verified;

    const user = await User.findOne({ where: { email } });

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