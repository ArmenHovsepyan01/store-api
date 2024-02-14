'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProductImages, {
        foreignKey: 'product_id',
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
      modelName: 'Product'
    }
  );
  return Product;
};
