'use strict';
import { Model, Optional } from 'sequelize';

interface OrderAttributes {
  id: number;
  amount: number;
  currency?: string;
  customerId: string;
  status: 'open' | 'succeed' | 'failed';
  paid: boolean;
  url: string;
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
    customerId: string;
    status: 'open' | 'succeed' | 'failed';
    paid: boolean;
    url: string;

    readonly createdAt;
    readonly updatedAt;
    static associate(models: any) {
      this.belongsTo(models.Customer, {
        as: 'orders',
        foreignKey: 'customerId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Customer',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'open'
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  );
  return Order;
};
