module.exports = (sequelize, DataTypes) => {
  const ProductSales = sequelize.define('ProductSales', {},{ 
    timestamps: false,
    tableName: 'product_sales',
  });
  ProductSales.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { as: 'products', through: ProductSales, foreignKey: 'sale_id', otherKey: 'product_id' });
  };
  return ProductSales;
};