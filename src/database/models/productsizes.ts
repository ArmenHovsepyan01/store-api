'use strict';

import Sequelize, { Model, Optional } from 'sequelize';

interface ProductSizesAttributes {
  id?: number;
  product_id: number;
  sizes_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSizesInput
  extends Optional<ProductSizesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ProductSizesOutput extends Required<ProductSizesAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class ProductSizes
    extends Model<ProductSizesAttributes, ProductSizesInput>
    implements ProductSizesAttributes
  {
    id!: number;
    product_id: number;
    sizes_id: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
  }

  ProductSizes.init(
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
      sizes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sizes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'ProductSizes'
    }
  );
  return ProductSizes;
};
