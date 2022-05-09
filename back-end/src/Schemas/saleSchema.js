const Joi = require('joi');

const saleSchema = Joi.object({
  sellerId: Joi.number().required(),
  deliveryAddress: Joi.string().not().empty().required(),
  deliveryNumber: Joi.number().required(),
  products: Joi.array().items(Joi.object({
    id: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  })).required(),
});

module.exports = saleSchema;
