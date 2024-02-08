import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import ProductCategories from "../models/ProductCategories";
import ProductColors from "../models/ProductColors";
import ProductSizes from "../models/ProductSizes";

class ProductService {
    async createProduct (){
        try {
            // await ProductImage.bulkCreate(productImagesData);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductById(id: string) {
        try {
           return await Product.findByPk(id, { include: [
                { model: ProductImage, as: 'images' },
                { model: ProductColors, as: 'colors' },
                { model: ProductSizes, as: 'sizes' },
                { model: ProductCategories, as: 'categories' }
            ] });
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new ProductService();