require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { utils } = require('../utils');
const { loginRouter, userRouter, productRouter, saleRouter } = require('./Routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(utils.LOGIN_ROUTE, loginRouter);
app.use(utils.USER_ROUTE, userRouter);
app.use(utils.PRODUCT_ROUTE, productRouter);
app.use(utils.SALE_ROUTE, saleRouter);

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
