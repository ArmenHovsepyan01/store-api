import sequelize from "../config/database";

import { DataTypes, Model } from 'sequelize';
import ProductImage from "./ProductImage";
import ProductColors from "./ProductColors";
import ProductCategories from "./ProductCategories";
import ProductSizes from "./ProductSizes";

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    main_image: {
        type: DataTypes.BLOB,
    }
}, {
    sequelize,
    modelName: 'Product',
    timestamps: false
});

Product.hasMany(ProductImage, { as: "images", foreignKey: "productId" });
Product.hasMany(ProductColors, { as: "colors", foreignKey: "productId" });
Product.hasMany(ProductCategories, { as: "categories", foreignKey: "productId" });
Product.hasMany(ProductSizes, { as: "sizes", foreignKey: "productId" });

export default Product;