module.exports = (sequelize, DataTypes) => {
  const ProductSales = sequelize.define('ProductSales', {},{ 
    timestamps: false,
    tableName: 'product_sales',
  });
  ProductSales.associate = (models) => {
    models.Sale.belongsToMany(models.Product,
      { as: 'products', through: ProductSales, foreignKey: 'sale_id', otherKey: 'product_id' });
    models.Product.belongsToMany(models.BlogPost,
      { as: 'sales', through: ProductSales, foreignKey: 'product_id', otherKey: 'sale_id' });
  };
  return ProductSales;
};