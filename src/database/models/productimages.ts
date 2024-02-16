'use strict';

import Sequelize, { InstanceDestroyOptions, Model, Optional } from 'sequelize';
interface ProductImagesAttributes {
  id?: number;
  image_url: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductImagesInput
  extends Optional<ProductImagesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ProductImagesOutput extends Required<ProductImagesAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class ProductImages
    extends Model<ProductImagesAttributes, ProductImagesInput>
    implements ProductImagesAttributes
  {
    id!: number;
    image_url: string;
    productId: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
      this.belongsTo(models.Product);
    }
  }

  ProductImages.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'ProductImages'
    }
  );
  return ProductImages;
};
