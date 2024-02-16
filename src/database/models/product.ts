'use strict';
import Sequelize, { InstanceDestroyOptions, Model, Optional } from 'sequelize';

import fs from 'fs';
import path from 'path';

interface ProductAttributes {
  id?: number;
  name: string;
  description?: string;
  brand: string;
  price: number;
  isPublished?: boolean;
  main_img: string;
  user_id: number;
  category_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInput
  extends Optional<
    ProductAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'description' | 'isPublished'
  > {}
export interface ProductOutput extends Required<ProductAttributes> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
    id!: number;
    name: string;
    description!: string;
    brand: string;
    price: number;
    isPublished!: boolean;
    main_img: string;
    user_id: number;
    category_id: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      this.hasMany(models.ProductImages, {
        as: 'images',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Categories, {
        as: 'category',
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Colors, {
        through: models.ProductColors,
        as: 'colors',
        foreignKey: 'product_id',
        otherKey: 'colors_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Sizes, {
        through: models.ProductSizes,
        as: 'sizes',
        foreignKey: 'product_id',
        otherKey: 'sizes_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Cart, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      main_img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Product',
      hooks: {
        async beforeDestroy(instance: Product, options: InstanceDestroyOptions): Promise<void> {
          //@ts-ignore
          const images = await instance.getImages();

          for (const image of images) {
            const imagePath = path.join(path.resolve(), 'public', image.image_url);
            if (fs.existsSync(imagePath)) await fs.promises.unlink(imagePath);
          }

          const mainImagePath = path.join(path.resolve(), 'public', instance.main_img);
          if (fs.existsSync(mainImagePath)) await fs.promises.unlink(mainImagePath);
        }
      }
    }
  );
  console.log();

  return Product;
};
