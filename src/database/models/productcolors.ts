'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class ProductColors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ProductColors.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      colors_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Colors',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'ProductColors'
    }
  );
  return ProductColors;
};
