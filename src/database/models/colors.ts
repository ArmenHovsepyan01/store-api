'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: 'ProductsColor',
        as: 'products',
        foreignKey: 'colorsId',
        otherKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Colors.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Colors'
    }
  );
  return Colors;
};
