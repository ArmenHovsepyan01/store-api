import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductImage extends Model {}

ProductImage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imageData: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ProductImage',
    timestamps: false
});

export default ProductImage;
