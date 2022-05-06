const { Sale, SaleProduct, User, Product } = require('../../database/models');

async function findAll() {
  return Sale.findAll();
}

async function create(data) {
  const { products, userId, sellerId, deliveryAddress, deliveryNumber } = data;

  let totalPrice = products.reduce((sum, product) => sum + (+product.price), 0);

  totalPrice = totalPrice.toFixed(2);

  const newSale = await Sale.create(
    { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
  );

  const { id: saleId } = newSale.dataValues;

  const saleProducts = products.map(({ id, quantity }) => ({ saleId, productId: id, quantity }));

  await SaleProduct.bulkCreate(saleProducts);

  return newSale.dataValues;
}

async function findOne(id) {
  return Sale.findOne({ where: { id },
    include: [
    { model: User, as: 'seller', attributes: ['name'] },
    { model: Product, as: 'products' },
    ], 
  });
}

module.exports = {
  findAll,
  create,
  findOne,
};