const { Product } = require('../../database/models');

async function findAll() {
  return Product.findAll();
}

module.exports = {
  findAll,
};