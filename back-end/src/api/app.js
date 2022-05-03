require('dotenv').config();
const express = require('express');

const { utils } = require('../utils');
const routes = require('./Controllers');

const app = express();

app.use(express.json());

app.use(utils.LOGIN_ROUTE, routes.loginController);
app.use(utils.USER_ROUTE, routes.userController);
app.use(utils.PRODUCT_ROUTE, routes.productController);
app.use(utils.SALE_ROUTE, routes.saleRouter);

app.use((err, __req, res, __next) => {
  const status = utils.ERR_CODES[err.code];

  if (status) {
    return res.status(status).json({ message: err.message }).end();
  }
  
  return res
    .status(utils.HTTP_INTERNAL_SERVER_ERROR_STATUS)
    .json({ message: 'Internal server error' }).end();
});

module.exports = app;