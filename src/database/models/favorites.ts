'use strict';

import Sequelize, { Model, Optional } from 'sequelize';
interface FavoritesAttributes {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FavoritesInput
  extends Optional<FavoritesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface FavoritesOutput extends Required<FavoritesAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Favorites
    extends Model<FavoritesAttributes, FavoritesInput>
    implements FavoritesAttributes
  {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;

    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Favorites.init(
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
          model: 'Users',
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
      modelName: 'Favorites'
    }
  );
  return Favorites;
};
