'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        as: 'images',
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });
    }
  }

  ProductImages.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'ProductImages'
    }
  );
  return ProductImages;
};
