module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, { 
    timestamps: false,
    tableName: 'sales_products',
  });

  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, { 
      as: 'products',
      through: saleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id' });
  };
  return saleProduct;
};