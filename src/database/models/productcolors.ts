'use strict';

import Sequelize, { Optional } from 'sequelize';

import { Model } from 'sequelize';

interface ProductColorsAttributes {
  id?: number;
  product_id: number;
  colors_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductColorsInput
  extends Optional<ProductColorsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ProductColorsOutput extends Required<ProductColorsAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class ProductColors
    extends Model<ProductColorsAttributes, ProductColorsInput>
    implements ProductColorsAttributes
  {
    id?: number;
    product_id: number;
    colors_id: number;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
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
