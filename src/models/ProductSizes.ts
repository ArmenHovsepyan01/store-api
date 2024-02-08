import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ProductSizes extends Model{}

ProductSizes.init({
   id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   size: {
       type: DataTypes.STRING,
       allowNull: false
   }
}, {
    sequelize,
    modelName: "ProductSizes",
    timestamps: false
});

export default ProductSizes;