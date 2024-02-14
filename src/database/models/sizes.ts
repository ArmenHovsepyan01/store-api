'use strict';

import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.ProductSizes,
        as: 'products',
        foreignKey: 'sizesId',
        otherKey: 'productId',
        onDelete: 'CASCADE'
      });
    }
  }
  Sizes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Sizes'
    }
  );
  return Sizes;
};
