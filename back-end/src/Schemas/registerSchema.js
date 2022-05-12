const joi = require('joi');
const { utils } = require('../utils');

const registerSchema = joi.object().keys({
  name: joi.string().required().min(12).messages({
    'string.base': utils.MESSAGES.NAME_NOT_STRING,
    'string.min': utils.MESSAGES.NAME_INVALID,
    'string.empty': utils.MESSAGES.NAME_EMPTY,
    'any.required': utils.MESSAGES.NAME_NOT_FOUND,
  }),
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
  role: joi.string().min(6),
});

module.exports = registerSchema;