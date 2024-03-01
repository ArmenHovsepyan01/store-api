'use strict';

import { Model, Optional } from 'sequelize';
import colorsService from '../../services/colors.service';
import { Colors } from './models';
import { validateLoginFields } from '../../validators/loginValidator';

interface ColorsAttributes {
  id?: number;
  color: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ColorsInput extends Optional<ColorsAttributes, 'id' | 'updatedAt' | 'createdAt'> {}
export interface ColorsOutput extends Required<ColorsAttributes> {}

export default (sequelize: any, DataTypes: any) => {
  class Colors extends Model<ColorsAttributes, ColorsInput> implements ColorsAttributes {
    id: number;
    color: string;

    readonly updatedAt: Date;
    readonly createdAt: Date;

    static associate(models: any) {
      this.belongsToMany(models.Product, {
        through: 'ProductsColor',
        as: 'products',
        foreignKey: 'colors_id',
        otherKey: 'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Colors.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      color: {
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
      modelName: 'Colors',
      hooks: {
        async beforeCreate(attributes) {
          const newColor = attributes.dataValues.color;

          const color = await Colors.findOne({
            where: {
              color: newColor
            }
          });

          if (color) throw new Error('Color already exists create another one.');
        }
      }
    }
  );
  return Colors;
};
