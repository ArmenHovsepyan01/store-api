'use strict';

import { Model, Optional } from 'sequelize';

interface CategoriesAttributes {
  id?: number;
  category: string;
  parent_id?: number;
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
    parent_id!: number;

    readonly updatedAt: Date;
    readonly createdAt: Date;

    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: 'category_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.hasMany(models.Categories, {
        as: 'subcategories',
        foreignKey: 'parent_id'
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
      parent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
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
      modelName: 'Categories',
      hooks: {
        async beforeCreate(attributes) {
          console.log(attributes.dataValues.category);
          const newCategory = attributes.dataValues.category;

          const category = await Categories.findOne({
            where: {
              category: newCategory
            }
          });

          if (category) throw new Error('Category already exists create another one.');
        },
        async afterDestroy(instance) {
          console.log(instance.dataValues.category, 'was deleted');
        }
      }
    }
  );
  return Categories;
};
