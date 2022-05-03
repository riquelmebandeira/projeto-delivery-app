const { Sale } = require('../../database/models');

async function findAll() {
  return Sale.findAll();
}

module.exports = {
  findAll,
};