import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductImage extends Model {}

ProductImage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    sequelize,
    modelName: 'ProductImage',
    timestamps: false
});

export default ProductImage;
