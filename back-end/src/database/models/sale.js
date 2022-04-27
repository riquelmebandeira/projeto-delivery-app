module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_adress: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, { 
    timestamps: false,
    tableName: 'sales',
  });
  Sale.associate = function (models) {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
    Sale.hasMany(models.SaleProduct, {
      foreignKey: 'sale_id',
      as: 'sale_products',
    });
  };
  return Sale;
};