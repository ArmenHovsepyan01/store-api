'use strict';

import { Model, Optional } from 'sequelize';

interface OrderProductsAttributes {
  id?: number;
  productId: number;
  orderId: number;
  quantity?: number;
}

export interface OrderProductsInput extends Optional<OrderProductsAttributes, 'id'> {}

export default (sequelize, DataTypes) => {
  class OrderProducts
    extends Model<OrderProductsAttributes, OrderProductsInput>
    implements OrderProductsAttributes
  {
    id?: number;
    productId: number;
    orderId: number;
  }

  OrderProducts.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      orderId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'OrderProducts'
    }
  );
  return OrderProducts;
};
