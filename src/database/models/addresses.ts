'use strict';
import Sequelize, { Model, Optional } from 'sequelize';

interface AddressesAttributes {
  id?: number;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  street_address: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddressesInput extends Optional<AddressesAttributes, 'id'> {}
export interface AddressesOutput extends Required<AddressesAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Addresses
    extends Model<AddressesAttributes, AddressesInput>
    implements AddressesAttributes
  {
    id!: number;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
    user_id: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id'
      });
    }
  }
  Addresses.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
      modelName: 'Addresses'
    }
  );
  return Addresses;
};
