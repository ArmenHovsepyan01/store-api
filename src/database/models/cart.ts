'use strict';

import Sequelize, { Model, Optional } from 'sequelize';

interface CartAttributes {
  id?: number;
  user_id: number;
  product_id: number;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartInput extends Optional<CartAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface CartOutput extends Required<CartAttributes> {}
export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Cart extends Model<CartAttributes, CartInput> implements CartAttributes {
    id!: number;
    user_id!: number;
    product_id!: number;
    quantity!: number;

    readonly updatedAt!: Date;
    readonly createdAt!: Date;

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
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
      modelName: 'Cart'
    }
  );
  return Cart;
};
