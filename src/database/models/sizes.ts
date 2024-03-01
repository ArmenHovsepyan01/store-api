'use strict';

import Sequelize, { CreateOptions, Model, Optional } from 'sequelize';
import { HookReturn } from 'sequelize/lib/hooks';

interface SizesAttributes {
  id?: number;
  size: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SizesInput extends Optional<SizesAttributes, 'id' | 'updatedAt' | 'createdAt'> {}
export interface SizesOutput extends Required<SizesAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Sizes extends Model<SizesAttributes, SizesInput> implements SizesAttributes {
    id!: number;
    size: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      this.belongsToMany(models.Product, {
        through: models.ProductSizes,
        as: 'products',
        foreignKey: 'sizes_id',
        otherKey: 'product_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Sizes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Sizes',
      hooks: {
        async beforeCreate(attributes) {
          const newSize = attributes.dataValues.size;

          const size = await Sizes.findOne({
            where: {
              size: newSize
            }
          });

          if (size) throw new Error('Size already exists create another one.');
        }
      }
    }
  );
  return Sizes;
};
