'use strict';
import { Model, Optional } from 'sequelize';

interface OrderAttributes {
  id: number;
  amount: number;
  currency?: string;
  status: 'open' | 'succeed' | 'failed';
  paid: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderInput
  extends Optional<OrderAttributes, 'id' | 'updatedAt' | 'createdAt' | 'currency'> {}

export default (sequelize, DataTypes) => {
  class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    id: number;
    amount: number;
    currency?: string;
    status: 'open' | 'succeed' | 'failed';
    paid: boolean;
    userId: number;

    readonly createdAt;
    readonly updatedAt;

    static associate(models: any) {
      this.belongsTo(models.User, {
        as: 'orders',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Product, {
        as: 'products',
        foreignKey: 'orderId',
        otherKey: 'productId',
        through: models.OrderProducts,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'usd'
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'open'
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  );
  return Order;
};
