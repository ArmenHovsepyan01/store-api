import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Categories from "./Categories";

class ProductCategory extends Model {}

ProductCategory.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      references: { model: Product },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: Categories },
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    timestamps: false,
  }
);

export default ProductCategory;
