module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });
  Sale.associate = function (models) {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };
  return Sale;
};