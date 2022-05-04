const { Sale, SaleProduct } = require('../../database/models');

async function findAll() {
  return Sale.findAll();
}

async function create(data) {
  const { products, userId, sellerId, deliveryAddres, deliveryNumber } = data;

  let totalPrice = products.reduce((sum, product) => sum + (+product.price), 0);

  totalPrice = totalPrice.toFixed(2);

  const newSale = Sale.create({ userId, sellerId, totalPrice, deliveryAddres, deliveryNumber });

  const { id: saleId } = newSale.dataValues;

  const saleProducts = products.map(({ id, quantity }) => ({ saleId, productId: id, quantity }));

  await SaleProduct.bulkCreate(saleProducts);

  return newSale.dataValues;
}

module.exports = {
  findAll,
  create,
};