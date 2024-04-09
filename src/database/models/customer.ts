'use strict';

import { Model, Optional } from 'sequelize';

interface CustomerAttributes {
  id: string;
  name: string;
  address: string;
  balance?: number;
  currency?: string;
  email: string;
  userId: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface CustomerInput extends Optional<CustomerAttributes, 'balance' | 'currency'> {}

export default (sequelize, DataTypes) => {
  class Customer extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
    id: string;
    name: string;
    address: string;
    balance?: number;
    currency?: string;
    email: string;
    userId: number;

    readonly createdAt;
    readonly updatedAt;

    static associate(models) {
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'customerId'
      });
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'usd'
      },
      email: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Customer'
    }
  );
  return Customer;
};
