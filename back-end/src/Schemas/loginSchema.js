const joi = require('joi');
const { utils } = require('../utils');

const userSchema = joi.object().keys({
  email: joi.string().required().email().messages({
    'string.base': utils.MESSAGES.EMAIL_NOT_STRING,
    'string.email': utils.MESSAGES.EMAIL_INVALID,
    'string.empty': utils.MESSAGES.EMAIL_EMPTY,
    'any.required': utils.MESSAGES.EMAIL_NOT_FOUND,
  }),
  password: joi.string().min(6).required().messages({
    'string.base': utils.MESSAGES.PASSWORD_NOT_STRING,
    'string.min': utils.MESSAGES.PASSWORD_INVALID,
    'string.empty': utils.MESSAGES.PASSWORD_EMPTY,
    'any.required': utils.MESSAGES.PASSWORD_NOT_FOUND,
  }),
});

module.exports = userSchema;