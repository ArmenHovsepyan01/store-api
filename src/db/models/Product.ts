import sequelize from "../config/database";

import { DataTypes, InstanceDestroyOptions, Model } from "sequelize";

import ProductImage from "./ProductImage";
import ProductColors from "./ProductColors";
import ProductCategory from "./ProductCategory";
import ProductSizes from "./ProductSizes";
import Categories from "./Categories";
import User from "./User";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    main_image: {
      type: DataTypes.TEXT,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    colors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    timestamps: false,
  },
);

Product.addHook("beforeDestroy", (product) => {
  console.log(product);
});

Product.hasMany(ProductImage, {
  as: "images",
  foreignKey: "productId",
  onDelete: "CASCADE",
});

Product.belongsToMany(Categories, {
  through: ProductCategory,
  foreignKey: "productId",
  as: "category",
});

Categories.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "categoryId",
  as: "product",
});

// Product.hasMany(ProductCategories, { as: "categories", foreignKey: "productId" });
//
// (async () => {
//   await Product.sync();
//   await ProductImage.sync({ force: true });
//   await ProductSizes.sync({ force: true });
//   await ProductColors.sync({ force: true });
//   await ProductCategory.sync({ force: true });
//   await User.sync({ force: true });
// })();
//
// (async () => {
//   const categories = [
//     "clothes",
//     "electronics",
//     "furniture",
//     "shoes",
//     "miscellaneous",
//   ];
//   const insertingCategories = categories.map((item) => {
//     return { category: item };
//   });
//
//   await Categories.sync();
//   await Categories.bulkCreate(insertingCategories);
// })();

export default Product;
