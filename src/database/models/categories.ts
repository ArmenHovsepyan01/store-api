'use strict';

import Sequelize, { Model, Optional } from 'sequelize';

interface CategoriesAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoriesInput
  extends Optional<CategoriesAttributes, 'id' | 'updatedAt' | 'createdAt'> {}
export interface CategoriesOutput extends Required<CategoriesAttributes> {}

export default (sequelize: any, DataTypes: any) => {
  class Categories
    extends Model<CategoriesAttributes, CategoriesInput>
    implements CategoriesAttributes
  {
    id!: number;
    category: string;

    readonly updatedAt: Date;
    readonly createdAt: Date;

    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: 'category_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Categories.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: 'Categories'
    }
  );
  return Categories;
};
