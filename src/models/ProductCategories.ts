import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ProductCategories extends Model{}

ProductCategories.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "ProductCategories",
    timestamps: false
});

export default ProductCategories;