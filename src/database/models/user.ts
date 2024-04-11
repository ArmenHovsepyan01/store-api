import Sequelize, { Model, NonAttribute, Optional } from 'sequelize';
import { AddressesOutput } from './addresses';
import { CartOutput } from './cart';

interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: string;
  addresses?: AddressesOutput[];
  Carts?: CartOutput[];
  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UserOutput extends Required<UserAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id!: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    role: string;
    customerId: string;

    declare addresses?: NonAttribute<AddressesOutput[]>;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Cart, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Favorites, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Addresses, {
        as: 'addresses',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        validate: {
          isAdmin: async (value) => {
            const admin = await User.findOne({ where: { role: 'admin' } });
            if (value === 'admin' && admin) {
              throw new Error('Only one admin user can be created.');
            }
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
