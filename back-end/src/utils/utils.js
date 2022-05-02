// Messages
const MESSAGES = {
  NAME_INVALID: '"name" length must be 12 characters long',
  NAME_NOT_FOUND: '"name" is required',
  NAME_NOT_STRING: '"name" should be a string',
  NAME_EMPTY: '"name" is not allowed to be empty',
  EMAIL_INVALID: '"email" must be a valid email',
  EMAIL_NOT_FOUND: '"email" is required',
  EMAIL_NOT_STRING: '"email" should be a string',
  EMAIL_EMPTY: '"email" is not allowed to be empty',
  PASSWORD_INVALID: '"password" length must be 6 characters long',
  PASSWORD_NOT_FOUND: '"password" is required',
  PASSWORD_NOT_STRING: '"password" should be a string',
  PASSWORD_EMPTY: '"password" is not allowed to be empty',
  USER_ALREADY_EXISTS: 'User already registered',
  USER_NOT_EXISTS: 'Invalid fields',
  USER_NOT_FOUND: 'User does not exist',
  CREDENTIALS_INVALID: 'Invalid credentials',
  TOKEN_NOT_FOUND: 'Token not found',
  TOKEN_INVALID: 'Expired or invalid token',
  UNAUTHORIZED_USER: 'Unauthorized user',
};

const JWT_SECRET = 'nomeAEscolher';

// HTTP response status codes
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CONFLICT_STATUS = 409;
const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

// Errors code
const ERR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
  'string.base': 400,
  'string.min': 400,
  'string.email': 400,
  'string.empty': 400,
  'any.required': 400,
  'number.min': 400,
  'number.base': 400,
};

// Routes
const USER_ROUTE = '/users';
const LOGIN_ROUTE = '/login';
const SALE_ROUTE = '/sales';
const POST_ROUTE = '/post';

// Port
const PORT = '3000';

// Functions

// Export

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  USER_ROUTE,
  LOGIN_ROUTE,
  SALE_ROUTE,
  POST_ROUTE,
  PORT,
  ERR_CODES,
  MESSAGES,
  JWT_SECRET,
};